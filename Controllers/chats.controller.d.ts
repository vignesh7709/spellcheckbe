import { Request, Response } from "express";
import { Chat } from "src/Models/chat.model";
export declare class ChatsController {
    private chat;
    constructor(chat: Chat);
    processGetAllChats(request: Request, response: Response): Promise<void>;
}
