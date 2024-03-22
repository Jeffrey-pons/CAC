import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './archives/archives.module';
import { WorkExpoPermanentModule } from './work-expo-permanent/work-expo-permanent.module';

dotenv.config();

@Module({
  imports: [
    AdminModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ArchivesModule,
    WorkExpoPermanentModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
