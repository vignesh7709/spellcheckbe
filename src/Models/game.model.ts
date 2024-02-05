
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Game } from 'src/Entities/game.entity';
import { SocketService } from 'src/Services/socket.service';
@Injectable()
export class Games{
    static writeLock = false;
    constructor(private socketService:SocketService){

    }
    postGame=async (game:Game)=>{
        if(Games.writeLock){
            await (new Promise((res,rej)=>{
                let intervalId = setInterval(()=>{
                if(!Games.writeLock){
                    clearInterval(intervalId);
                    res(true);
                }
            },1000);}));
        }
        if(!Games.writeLock){
            Games.writeLock=true;
            let games= JSON.parse(fs.readFileSync('./Sample/game.json',{encoding:'utf-8'}));
            game.playerCount=1;
            game.players[0].id=1;
            games[game.serverCode]=game;
            fs.writeFileSync('./Sample/game.json',JSON.stringify(games));
            Games.writeLock=false;
        }
        return game;
    }
    joinGame=async (game:Game)=>{
        try{
        if(Games.writeLock){
            await (new Promise((res,rej)=>{
                let intervalId = setInterval(()=>{
                if(!Games.writeLock){
                    clearInterval(intervalId);
                    res(true);
                }
            },1000);}));
        }
        if(!Games.writeLock){
            Games.writeLock=true;
            let games= JSON.parse(fs.readFileSync('./Sample/game.json',{encoding:'utf-8'}));
            games[game.serverCode].players.map(player=>{
                if(player.name===game.players[0].name){
                    throw new Error("DUPLICATE_PLAYER");
                }
            })
            games[game.serverCode]={...games[game.serverCode],players:[...games[game.serverCode].players,{...game.players[0],id:games[game.serverCode].playerCount+1}],playerCount:++games[game.serverCode].playerCount};
            fs.writeFileSync('./Sample/game.json',JSON.stringify(games));
            console.log("test",`${game.serverCode}_joined`);
            this.socketService.socket.emit(`${game.serverCode}_joined`,JSON.stringify(game));
            Games.writeLock=false;
            return games[game.serverCode];
        }
        }
        catch(err){
            Games.writeLock=false;
            throw err;
        }
    }
    getAllGame=async () => {
        return JSON.parse(fs.readFileSync('./Sample/game.json',{encoding:'utf-8'})||'[]')
    }
    updateGame = async () => {
        
    }
}