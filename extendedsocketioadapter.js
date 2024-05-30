"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedSocketIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const io = require("socket.io");
class ExtendedSocketIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(server) {
        super();
        this.server = server;
        const options = {
            cors: {
                origin: true,
                methods: ["GET", "POST"],
                credentials: true,
            }
        };
        this.ioServer = new io.Server(server, options);
    }
    create(port) {
        console.log('websocket gateway port argument is ignored by ExtendedSocketIoAdapter, use the same port of http instead');
        return this.ioServer;
    }
}
exports.ExtendedSocketIoAdapter = ExtendedSocketIoAdapter;
//# sourceMappingURL=extendedsocketioadapter.js.map