import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageGateway } from './Gateways/message.gateway';
import { ChatsController } from './Controllers/chats.controller';
import { Chat } from './Models/chat.model';
import { ConfigModule } from '@nestjs/config';
import { GamesController } from './Controllers/games.controller';
import { Games } from './Models/game.model';
import { SocketService } from './Services/socket.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController,ChatsController,GamesController],
  providers: [AppService,MessageGateway,Chat,Games,SocketService],
})
export class AppModule {}
