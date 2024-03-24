import { Module } from '@nestjs/common';
import { NextExpositionService } from './next-exposition.service';
import { NextExpositionController } from './next-exposition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NextExposition, NextExpositionSchema } from './entities/next-exposition.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NextExposition.name, schema: NextExpositionSchema }]),
  ],
  controllers: [NextExpositionController],
  providers: [NextExpositionService],
})
export class NextExpositionModule {}
