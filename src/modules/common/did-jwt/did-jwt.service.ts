import { Injectable } from '@nestjs/common';
import * as didJWT from 'did-jwt';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';

@Injectable()
export class DidJwtService {
  async createJWT(): Promise<string> {
    const signer = didJWT.ES256KSigner(
      didJWT.hexToBytes(
        '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f',
      ),
    );
    //aud is the DID of the receiver -> cliente
    //iat is the time of creation of the JWT
    //issuer is the DID of the sender -> generador
    const jwt = await didJWT.createJWT(
      {
        //aud: 'did:ethr:mumbai:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
        iat: undefined,
        name: 'PAYLOD PRUEBA',
      },
      {
        issuer: 'did:ethr:mumbai:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
        signer,
      },
      { alg: 'ES256K' },
    );
    console.log('encoded jwt: ', jwt);
    //pass the jwt from step 1

    console.log('decoded jwt: ', didJWT.decodeJWT(jwt));

    const decoded = didJWT.decodeJWT(jwt);
    console.log('decoded payload: ', decoded.payload);
    // verificar
    const config = {
      networks: [
        { name: 'mumbai', rpcUrl: 'https://rpc-mumbai.maticvigil.com/' },
      ],
    };

    const resolver = new Resolver({
      ...getResolver(config),
    });

    // use the JWT from step 1
    const verificationResponse = await didJWT.verifyJWT(jwt, {
      resolver,
      //audience: 'did:ethr:mumbai:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
    });
    console.log('verificationResponse', verificationResponse);

    return jwt;
  }
}
