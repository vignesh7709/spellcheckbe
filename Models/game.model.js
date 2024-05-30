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
var Games_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Games = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const socket_service_1 = require("../Services/socket.service");
let Games = exports.Games = Games_1 = class Games {
    constructor(socketService) {
        this.socketService = socketService;
        this.postGame = async (game) => {
            if (Games_1.writeLock) {
                await (new Promise((res, rej) => {
                    let intervalId = setInterval(() => {
                        if (!Games_1.writeLock) {
                            clearInterval(intervalId);
                            res(true);
                        }
                    }, 1000);
                }));
            }
            if (!Games_1.writeLock) {
                Games_1.writeLock = true;
                let games = JSON.parse(fs.readFileSync('./Sample/game.json', { encoding: 'utf-8' }));
                game.playerCount = 1;
                game.players[0].id = 1;
                games[game.serverCode] = game;
                fs.writeFileSync('./Sample/game.json', JSON.stringify(games));
                Games_1.writeLock = false;
            }
            return game;
        };
        this.joinGame = async (game) => {
            try {
                if (Games_1.writeLock) {
                    await (new Promise((res, rej) => {
                        let intervalId = setInterval(() => {
                            if (!Games_1.writeLock) {
                                clearInterval(intervalId);
                                res(true);
                            }
                        }, 1000);
                    }));
                }
                if (!Games_1.writeLock) {
                    Games_1.writeLock = true;
                    let games = JSON.parse(fs.readFileSync('./Sample/game.json', { encoding: 'utf-8' }));
                    games[game.serverCode].players.map(player => {
                        if (player.name === game.players[0].name) {
                            throw new Error("DUPLICATE_PLAYER");
                        }
                    });
                    games[game.serverCode] = { ...games[game.serverCode], players: [...games[game.serverCode].players, { ...game.players[0], id: games[game.serverCode].playerCount + 1 }], playerCount: ++games[game.serverCode].playerCount };
                    fs.writeFileSync('./Sample/game.json', JSON.stringify(games));
                    console.log("test", `${game.serverCode}_joined`);
                    this.socketService.socket.emit(`${game.serverCode}_joined`, JSON.stringify(game));
                    Games_1.writeLock = false;
                    return games[game.serverCode];
                }
            }
            catch (err) {
                Games_1.writeLock = false;
                throw err;
            }
        };
        this.getAllGame = async () => {
            return JSON.parse(fs.readFileSync('./Sample/game.json', { encoding: 'utf-8' }) || '[]');
        };
        this.updateGame = async () => {
        };
    }
};
Games.writeLock = false;
exports.Games = Games = Games_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], Games);
//# sourceMappingURL=game.model.js.map