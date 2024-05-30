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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const game_model_1 = require("../Models/game.model");
const socket_service_1 = require("../Services/socket.service");
let GamesController = exports.GamesController = class GamesController {
    constructor(game, socketService) {
        this.game = game;
        this.socketService = socketService;
    }
    async processGetAllGames(request, response) {
        try {
            let games = await this.game.getAllGame();
            let serverCode = request.query.serverCode.toString();
            if (serverCode) {
                let newGames = {};
                newGames[serverCode] = games[serverCode];
                games = newGames;
            }
            response.status(200);
            response.json(games);
            return;
        }
        catch (err) {
            response.status(400);
            response.json({ 'error': 'internal server error' });
        }
    }
    async processPostGame(request, response) {
        try {
            let gameData = request.body;
            gameData.serverCode = Math.floor(Math.random() * 10000);
            let resp = await this.game.postGame(gameData);
            response.status(200);
            response.json(resp);
        }
        catch (err) {
            response.status(400);
            response.json({ 'error': 'internal server error' });
        }
    }
    async processJoinGame(request, response) {
        try {
            let gameData = request.body;
            let resp = await this.game.joinGame(gameData);
            response.status(200);
            response.json(resp);
        }
        catch (err) {
            console.log(err);
            if (err.message === 'DUPLICATE_PLAYER') {
                response.status(400);
                response.json({ 'error': 'duplicate player name' });
                return;
            }
            response.status(400);
            response.json({ 'error': 'internal server error' });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "processGetAllGames", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "processPostGame", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "processJoinGame", null);
exports.GamesController = GamesController = __decorate([
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [game_model_1.Games, socket_service_1.SocketService])
], GamesController);
//# sourceMappingURL=games.controller.js.map