import { Artwork, ArtworkSchema } from './entities/work-expo-permanent.entity';
import { Module } from '@nestjs/common';
import { WorkExpoPermanentService } from './work-expo-permanent.service';
import { WorkExpoPermanentController } from './work-expo-permanent.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artwork.name, schema: ArtworkSchema }])],
  controllers: [WorkExpoPermanentController],
  providers: [WorkExpoPermanentService],
})
export class WorkExpoPermanentModule {}
