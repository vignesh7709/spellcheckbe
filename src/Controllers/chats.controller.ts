import { Controller, Get, Inject, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { Chat } from "src/Models/chat.model";
@Controller('chats')
export class ChatsController{
    constructor(private chat:Chat){
    }
    @Get()
    async processGetAllChats(@Req() request:Request,@Res() response:Response){
        try{
            let serverId = request.query.serverId;
            let chats = await this.chat.getAllServerMessages(serverId);
            response.status(200);
            response.json(chats);
            return;
        }catch(err){
            response.status(400);
            response.json({'error':'internal server error'});
        }
    }
}