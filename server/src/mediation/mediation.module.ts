import { Module } from '@nestjs/common';
import { MediationService } from './mediation.service';
import { MediationController } from './mediation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mediation, MediationSchema } from './entities/mediation.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mediation.name, schema: MediationSchema }])],
  controllers: [MediationController],
  providers: [MediationService],
})
export class MediationModule {}
