import { Module } from '@nestjs/common';
import { DidService } from './did.service';
import { DidController } from './did.controller';

@Module({
  providers: [DidService],
  controllers: [DidController],
})
export class DidModule {}
