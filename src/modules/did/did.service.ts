import { Injectable } from '@nestjs/common';

@Injectable()
export class DidService {
  getService(): string {
    return 'Hello From Services!';
  }

  generateDid(): string {
    return 'did:test:1234567890';
  }
}
