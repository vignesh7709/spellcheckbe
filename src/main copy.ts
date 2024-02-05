import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as https from 'https';
import { ExtendedSocketIoAdapter } from './extendedsocketioadapter';
async function bootstrap() {
  const privateKey = fs.readFileSync('./key.pem', 'utf8');
  const certificate = fs.readFileSync('./cert.pem', 'utf8');
  const httpsOptions = {key: privateKey, cert: certificate};
  const server = express();
  const app = await NestFactory.create(AppModule,new ExpressAdapter(server));
  const httpsServer = https.createServer(httpsOptions);
  app.useWebSocketAdapter(new ExtendedSocketIoAdapter(httpsServer));

  app.enableCors({
    origin:[
      'http://localhost:3000',
      'http://172.24.182.46:3000'
    ],
    methods:[
      "GET",
      "POST"
    ]
  })
  await app.init()
  //await app.listen(3030);
  await httpsServer.listen(3030);
}
bootstrap();
