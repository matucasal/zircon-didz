import { Module } from '@nestjs/common';
import { DidService } from './did.service';
import { DidController } from './did.controller';
import { DidJwtService } from '../common/did-jwt/did-jwt.service';

@Module({
  providers: [DidService, DidJwtService],
  controllers: [DidController],
})
export class DidModule {}
