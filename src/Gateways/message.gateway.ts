import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Chat } from "src/Models/chat.model";
import { SocketService } from 'src/Services/socket.service';

@WebSocketGateway({cors:true})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() wss:Server;
    constructor(private socketService:SocketService,private chat:Chat){
        
    }
    afterInit(server: Server) {
        console.log('Initialized');
        this.socketService.socket=server;
    }

    handleDisconnect(client: Socket) {
        console.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        
        console.log(`Client Connected: ${client.id}`,client.request.url);
    }
    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: string): Promise<void> {
        //const newMessage = await this.messagesService.createMessage(payload);
        this.chat.postMessage(payload);
        console.log("received message",payload,new Date());
        this.wss.emit('receiveMessage', payload);
    }
    @SubscribeMessage('gameStarted')
    async handleGameStarted(client: Socket, payload: string): Promise<void> {
        //const newMessage = await this.messagesService.createMessage(payload);
        let request = JSON.parse(payload);
        console.log("received message",request,new Date());
        this.wss.emit(`${request.serverCode}_started`, JSON.stringify(request.players));
    }

}