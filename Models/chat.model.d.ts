export declare class Chat {
    static writeLock: boolean;
    postMessage: (message: any) => Promise<any>;
    getAllServerMessages: (serverId: any) => Promise<any>;
}
