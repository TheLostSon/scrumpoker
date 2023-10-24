import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokerGateway } from './poker/poker.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PokerGateway],
})
export class AppModule {}
