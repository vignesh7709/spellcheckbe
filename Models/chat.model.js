"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Chat_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let Chat = exports.Chat = Chat_1 = class Chat {
    constructor() {
        this.postMessage = async (message) => {
            message = JSON.parse(message);
            if (Chat_1.writeLock) {
                await (new Promise((res, rej) => {
                    let intervalId = setInterval(() => {
                        if (!Chat_1.writeLock) {
                            clearInterval(intervalId);
                            res(true);
                        }
                    }, 1000);
                }));
            }
            if (!Chat_1.writeLock) {
                Chat_1.writeLock = true;
                let messages = JSON.parse(fs.readFileSync('./Sample/chats.json', { encoding: 'utf-8' }));
                if (!messages[message.serverId]) {
                    messages[message.serverId] = [];
                }
                messages[message.serverId].push(message.chat);
                fs.writeFileSync('./Sample/chats.json', JSON.stringify(messages));
                Chat_1.writeLock = false;
            }
            return message;
        };
        this.getAllServerMessages = async (serverId) => {
            let message = JSON.parse(fs.readFileSync('./Sample/chats.json', { encoding: 'utf-8' })) || {};
            return message[serverId] || [];
        };
    }
};
Chat.writeLock = false;
exports.Chat = Chat = Chat_1 = __decorate([
    (0, common_1.Injectable)()
], Chat);
//# sourceMappingURL=chat.model.js.map