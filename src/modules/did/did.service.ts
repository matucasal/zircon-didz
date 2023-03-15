import { Injectable } from '@nestjs/common';
import { DidJwtService } from '../common/did-jwt/did-jwt.service';
import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { Resolver } from 'did-resolver';
import * as ethr from 'ethr-did-resolver';
import { EthrDID } from 'ethr-did';

@Injectable()
export class DidService {
  constructor(private readonly didJwtService: DidJwtService) { }
  getService(): string {
    return 'Hello From Services!';
  }

  async generateJwtDid(): Promise<string> {
    return await this.didJwtService.createJWT();
  }

  async generateIpfsDid(): Promise<string> {
    const keyPair = await Ed25519KeyPair.generate({
      secureRandom: () => {
        return Buffer.from(
          '4f66b355aa7b0980ff901f2295b9c562ac3061be4df86703eb28c612faae6578',
          'hex',
        );
      },
    });

    const jwkpair = await keyPair.export({ type: 'JsonWebKey2020' });

    const didDocument = {
      '@context': 'https://www.w3.org/ns/did/v1',
      id: keyPair.id,
      controller: keyPair.controller,
      publicKey: [
        {
          id: keyPair.id + '#test',
          type: 'JsonWebKey2020',
          controller: keyPair.controller,
          publicKeyJwk: jwkpair['publicKeyJwk'],
        },
      ],
      authentication: [
        {
          type: 'JsonWebKey2020',
          publicKey: keyPair.id + '#test',
        },
      ],
    };

    console.log('didDocument', didDocument);

    return 'Hello From Ipfs Did!';
  }

  async generateEthrDid(): Promise<string> {
    const keypair = EthrDID.createKeyPair();

    const chainNameOrId = 'goerli'; // mainnet

    const etherDidGenerated = new EthrDID({ ...keypair, chainNameOrId });
    console.log('etherDidGenerated', etherDidGenerated);

    const didDocument = await this.resolveDid(etherDidGenerated.did);

    const pinataSDK = require('@pinata/sdk'); // eslint-disable-line
    const pinata = new pinataSDK(
      process.env.PINATE_API_KEY,
      process.env.PINATA_SECRET,
    );

    const { IpfsHash } = await pinata.pinJSONToIPFS(didDocument);
    console.log('IpfsHash', IpfsHash);


    return IpfsHash;
  }

  async resolveDid(did: string): Promise<any> {
    const config = {
      networks: [
        {
          name: 'goerli',
          rpcUrl:
            'https://eth-goerli.g.alchemy.com/v2/0iMeQ3h8Hs01tM6a85Wvf1Vq9YZarSxG',
        },
      ],
    };

    const ethrResolver = ethr.getResolver(config);
    const resolver = new Resolver(ethrResolver);

    const didDocument = await resolver.resolve(did);
    console.log('didDocument', didDocument);
    return didDocument;
  }
}
