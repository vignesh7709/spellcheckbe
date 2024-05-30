import { Game } from 'src/Entities/game.entity';
import { SocketService } from 'src/Services/socket.service';
export declare class Games {
    private socketService;
    static writeLock: boolean;
    constructor(socketService: SocketService);
    postGame: (game: Game) => Promise<Game>;
    joinGame: (game: Game) => Promise<any>;
    getAllGame: () => Promise<any>;
    updateGame: () => Promise<void>;
}
