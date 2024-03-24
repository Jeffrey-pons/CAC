import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './archives/archives.module';
import { WorkExpoPermanentModule } from './work-expo-permanent/work-expo-permanent.module';
import { NextExpositionModule } from './next-exposition/next-exposition.module';


dotenv.config();

@Module({
  imports: [
    AdminModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ArchivesModule,
    WorkExpoPermanentModule,
    NextExpositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(express.static(join(process.cwd(), 'uploads'))).forRoutes('work-expo-permanent/images/*');
  }
}

