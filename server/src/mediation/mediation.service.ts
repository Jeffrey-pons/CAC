import { Injectable } from '@nestjs/common';
import { CreateMediationDto } from './dto/create-mediation.dto';
import { UpdateMediationDto } from './dto/update-mediation.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Mediation } from './entities/mediation.entity';

@Injectable()
export class MediationService {
  constructor(@InjectModel('Mediation') private mediationModel: Model<Mediation>) {}

  async createMediation(
    createMediationDto: CreateMediationDto,
  ): Promise<{ newMediation: Mediation }> {
    const newMediation = new this.mediationModel(createMediationDto);
    const savedMediation = await newMediation.save();
    return { newMediation: savedMediation };
  }

  async findAllMediation(): Promise<Mediation[]> {
    const mediationData = await this.mediationModel.find().exec();
    if (!mediationData || mediationData.length == 0) {
      throw new Error('Mediation data not found!');
    }
    return mediationData;
  }

  async findOneMediation(id: string): Promise<Mediation> {
    const mediation = await this.mediationModel.findById(id).exec();
    if (!mediation) {
      throw new Error(`Mediation #${id} not found`);
    }
    return mediation;
  }

  async updateMediation(id: string, updateMediationDto: UpdateMediationDto): Promise<Mediation> {
    const existingMediation = await this.mediationModel.findByIdAndUpdate(id, updateMediationDto, {
      new: true,
    });
    if (!existingMediation) {
      throw new Error(`Mediation #${id} not found`);
    }
    return existingMediation;
  }

  async removeMediation(id: string): Promise<Mediation> {
    const removedMediation = await this.mediationModel.findByIdAndDelete(id);
    if (!removedMediation) {
      throw new Error(`Mediation #${id} not found`);
    }
    return removedMediation;
  }
}
