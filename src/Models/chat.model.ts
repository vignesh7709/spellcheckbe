import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class Chat{
    static writeLock = false;
    postMessage = async (message)=>{
        message = JSON.parse(message);
        if(Chat.writeLock){
            await (new Promise((res,rej)=>{
                let intervalId = setInterval(()=>{
                if(!Chat.writeLock){
                    clearInterval(intervalId);
                    res(true);
                }
            },1000);}));
        }
        if(!Chat.writeLock){
            Chat.writeLock=true;
            let messages:Array<any> = JSON.parse(fs.readFileSync('./Sample/chats.json',{encoding:'utf-8'}));
            if(!messages[message.serverId]){
                messages[message.serverId]=[];
            }
            messages[message.serverId].push(message.chat);
            
            fs.writeFileSync('./Sample/chats.json',JSON.stringify(messages));
            Chat.writeLock=false;
        }
        return message;
    }
    getAllServerMessages = async (serverId) => {
        let message = JSON.parse(fs.readFileSync('./Sample/chats.json',{encoding:'utf-8'}))||{};
        return message[serverId]||[];
    }
}