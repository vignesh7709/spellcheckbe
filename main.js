"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
async function bootstrap() {
    const privateKey = fs.readFileSync('./key.pem', 'utf8');
    const certificate = fs.readFileSync('./cert.pem', 'utf8');
    const httpsOptions = { key: privateKey, cert: certificate };
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const cors = process.env.CORS_ORIGIN;
    console.log(cors.split(','));
    app.enableCors({
        origin: cors.split(','),
        methods: [
            "GET",
            "POST",
            "PUT"
        ]
    });
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map