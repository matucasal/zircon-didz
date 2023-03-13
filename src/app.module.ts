import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DidModule } from './modules/did/did.module';
import { DidJwtService } from './modules/common/did-jwt/did-jwt.service';

@Module({
  imports: [DidModule],
  controllers: [AppController],
  providers: [AppService, DidJwtService],
})
export class AppModule {}
