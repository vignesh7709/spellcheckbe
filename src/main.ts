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
  const app = await NestFactory.create(AppModule);
  const cors = process.env.CORS_ORIGIN;
  console.log(cors.split(','));
  app.enableCors({
    origin:cors.split(','),
    methods:[
      "GET",
      "POST",
      "PUT"
    ]
  })
  await app.listen(3030)
  //await app.listen(3030);
}
bootstrap();
