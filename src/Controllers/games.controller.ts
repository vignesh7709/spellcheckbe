import { Controller, Get, Post, Inject, Req, Res, Put } from "@nestjs/common";
import { Request, Response } from "express";
import { Games } from "src/Models/game.model";
import { SocketService } from "src/Services/socket.service";
@Controller('games')
export class GamesController{
    constructor(private game:Games,private socketService:SocketService){
    }
    @Get()
    async processGetAllGames(@Req() request:Request,@Res() response:Response){
        try{
            let games = await this.game.getAllGame();
            let serverCode = request.query.serverCode.toString();
            if(serverCode){
                let newGames={};
                newGames[serverCode]=games[serverCode];
                games=newGames;
            }
            response.status(200);
            response.json(games);
            return;
        }catch(err){
            response.status(400);
            response.json({'error':'internal server error'});
        }
    }
    @Post()
    async processPostGame(@Req() request:Request,@Res() response:Response){
        try{
            let gameData = request.body;
            gameData.serverCode = Math.floor(Math.random()*10000);
            let resp = await this.game.postGame(gameData);
            response.status(200);
            response.json(resp);
        }catch(err){
            response.status(400);
            response.json({'error':'internal server error'});
        }
    }
    @Put()
    async processJoinGame(@Req() request:Request,@Res() response:Response){
        try{
            let gameData = request.body;
            let resp = await this.game.joinGame(gameData);
            response.status(200);
            response.json(resp);
        }catch(err){
            console.log(err);
            if(err.message === 'DUPLICATE_PLAYER'){
                response.status(400);
                response.json({'error':'duplicate player name'});
                return;
            }
            response.status(400);
            response.json({'error':'internal server error'});
        }
    }
}