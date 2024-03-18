import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv";
import { AdminSchema } from './admin/entities/admin.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './archives/archives.module';

dotenv.config();

@Module({
  imports: [
    AdminModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ArchivesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
