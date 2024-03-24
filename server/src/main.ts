import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 })); // 100 requests per minute
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  }); 
  app.use('/uploads', express.static(join(__dirname, 'uploads'))); // Serving static files
  
  await app.listen(process.env.PORT_BACKEND);
}
bootstrap();
