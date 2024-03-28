import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
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
import { MemberModule } from './member/member.module';
import { MediationModule } from './mediation/mediation.module';

dotenv.config();

@Module({
  imports: [
    AdminModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ArchivesModule,
    WorkExpoPermanentModule,
    NextExpositionModule,
    MemberModule,
    MediationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const path = req.path;
        if (path.endsWith('.jpg')) {
          res.type('image/jpeg');
        } else if (path.endsWith('.png')) {
          res.type('image/png');
        } else if (path.endsWith('.webp')) {
          res.type('image/webp');
        }
        express.static(join(process.cwd(), 'uploads'))(req, res, next);
      })
      .forRoutes({ path: 'work-expo-permanent/images/*', method: RequestMethod.ALL });
  }
}
