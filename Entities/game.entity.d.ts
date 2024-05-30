export declare class Game {
    serverCode?: string;
    players: Array<{
        id: Number;
        name: string;
    }>;
    playerCount?: Number;
    scoreBoard?: Array<{
        playerId: Number;
        score: Number;
    }>;
}
