import { Injectable } from '@nestjs/common';

@Injectable()
export class DidService {
  getService(): string {
    return 'Hello From Services!';
  }
}
