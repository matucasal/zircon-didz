import { Injectable } from '@nestjs/common';
import * as didJWT from 'did-jwt';

@Injectable()
export class DidJwtService {
  async createJWT(): Promise<string> {
    const signer = didJWT.ES256KSigner(
      didJWT.hexToBytes(
        '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f',
      ),
    );

    const jwt = await didJWT.createJWT(
      {
        aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
        iat: undefined,
        name: 'uPort Developer',
      },
      { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
      { alg: 'ES256K' },
    );
    console.log('encoded jwt: ', jwt);
    //pass the jwt from step 1

    console.log('decoded jwt: ', didJWT.decodeJWT(jwt));

    return jwt;
  }
}
