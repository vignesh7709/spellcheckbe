/// <reference types="node" />
import { IoAdapter } from "@nestjs/platform-socket.io";
import * as io from 'socket.io';
import * as https from 'https';
export declare class ExtendedSocketIoAdapter extends IoAdapter {
    protected server: https.Server;
    protected ioServer: io.Server;
    constructor(server: https.Server);
    create(port: number): io.Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
