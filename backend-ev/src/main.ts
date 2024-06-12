/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import 'dotenv/config';
import { BaseInterceptor } from './Interceptor/base.interceptor';
// import cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.enableCors();
  app.useGlobalInterceptors(new BaseInterceptor());
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
