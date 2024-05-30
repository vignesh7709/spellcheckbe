import { IoAdapter } from "@nestjs/platform-socket.io";
import * as io from 'socket.io';
import * as https from 'https';
export class ExtendedSocketIoAdapter extends IoAdapter {
    protected ioServer: io.Server;

    constructor(protected server: https.Server) {
        super();

        const options = {
            path:process.env.SPATH,
            cors: {
                origin: true,
                methods: ["GET", "POST"],
                credentials: true,
            }
        }

        this.ioServer = new io.Server(server, options);
    }

    create (port: number) {
        console.log('websocket gateway port argument is ignored by ExtendedSocketIoAdapter, use the same port of http instead')
        return this.ioServer
    }
}