import { Body, Controller, Get, Post } from '@nestjs/common';
import { DidService } from './did.service';
import { ResolveDidDto } from './dtos/resolve.did.dto';

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

  @Post('generate-ethr-did')
  async generateEthrDid(): Promise<string> {
    return await this.didService.generateEthrDid();
  }

  @Post('resolve-ethr-did')
  async resolveDid(@Body() resolveDidDto: ResolveDidDto): Promise<string> {
    return await this.didService.resolveDid(resolveDidDto.did);
  }
}
