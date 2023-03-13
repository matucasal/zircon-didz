import { Injectable } from '@nestjs/common';
import { DidJwtService } from '../common/did-jwt/did-jwt.service';

@Injectable()
export class DidService {
  constructor(private readonly didJwtService: DidJwtService) {}
  getService(): string {
    return 'Hello From Services!';
  }

  async generateJwtDid(): Promise<string> {
    return await this.didJwtService.createJWT();
  }
}
