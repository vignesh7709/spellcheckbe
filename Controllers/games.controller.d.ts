import { Request, Response } from "express";
import { Games } from "src/Models/game.model";
import { SocketService } from "src/Services/socket.service";
export declare class GamesController {
    private game;
    private socketService;
    constructor(game: Games, socketService: SocketService);
    processGetAllGames(request: Request, response: Response): Promise<void>;
    processPostGame(request: Request, response: Response): Promise<void>;
    processJoinGame(request: Request, response: Response): Promise<void>;
}
