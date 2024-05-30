"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_model_1 = require("../Models/chat.model");
const socket_service_1 = require("../Services/socket.service");
let MessageGateway = exports.MessageGateway = class MessageGateway {
    constructor(socketService, chat) {
        this.socketService = socketService;
        this.chat = chat;
    }
    afterInit(server) {
        console.log('Initialized');
        this.socketService.socket = server;
    }
    handleDisconnect(client) {
        console.log(`Client Disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        console.log(`Client Connected: ${client.id}`, client.request.url);
    }
    async handleSendMessage(client, payload) {
        this.chat.postMessage(payload);
        console.log("received message", payload, new Date());
        this.wss.emit('receiveMessage', payload);
    }
    async handleGameStarted(client, payload) {
        let request = JSON.parse(payload);
        console.log("received message", request, new Date());
        this.wss.emit(`${request.serverCode}_started`, JSON.stringify(request.players));
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('gameStarted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleGameStarted", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [socket_service_1.SocketService, chat_model_1.Chat])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map