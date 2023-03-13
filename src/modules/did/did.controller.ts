import { Controller, Get, Post } from '@nestjs/common';
import { DidService } from './did.service';

@Controller('did')
export class DidController {
  constructor(private readonly didService: DidService) {}

  @Get()
  getHello(): string {
    return this.didService.getService();
  }

  @Post('generate-jwt-did')
  async generateJwtDid(): Promise<string> {
    return await this.didService.generateJwtDid();
  }

  @Post('generate-ipfs-did')
  async generateIpfsDid(): Promise<string> {
    return await this.didService.generateIpfsDid();
  }
}
