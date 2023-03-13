import { Controller, Get, Post } from '@nestjs/common';
import { DidService } from './did.service';

@Controller('did')
export class DidController {
  constructor(private readonly didService: DidService) {}

  @Get()
  getHello(): string {
    return this.didService.getService();
  }

  @Post('generate')
  async generateDid(): Promise<string> {
    return await this.didService.generateDid();
  }
}
