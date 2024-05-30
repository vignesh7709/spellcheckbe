"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const https = require("https");
const extendedsocketioadapter_1 = require("./extendedsocketioadapter");
async function bootstrap() {
    const privateKey = fs.readFileSync('./key.pem', 'utf8');
    const certificate = fs.readFileSync('./cert.pem', 'utf8');
    const httpsOptions = { key: privateKey, cert: certificate };
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    const httpsServer = https.createServer(httpsOptions);
    app.useWebSocketAdapter(new extendedsocketioadapter_1.ExtendedSocketIoAdapter(httpsServer));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://172.24.182.46:3000'
        ],
        methods: [
            "GET",
            "POST"
        ]
    });
    await app.init();
    await httpsServer.listen(3030);
}
bootstrap();
//# sourceMappingURL=main%20copy.js.map