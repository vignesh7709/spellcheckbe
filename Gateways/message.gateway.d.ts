import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Chat } from "src/Models/chat.model";
import { SocketService } from 'src/Services/socket.service';
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private socketService;
    private chat;
    wss: Server;
    constructor(socketService: SocketService, chat: Chat);
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleSendMessage(client: Socket, payload: string): Promise<void>;
    handleGameStarted(client: Socket, payload: string): Promise<void>;
}
