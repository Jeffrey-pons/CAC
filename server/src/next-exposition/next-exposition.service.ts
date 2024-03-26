import { Injectable } from '@nestjs/common';
import { CreateNextExpositionDto } from './dto/create-next-exposition.dto';
import { UpdateNextExpositionDto } from './dto/update-next-exposition.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NextExposition } from './entities/next-exposition.entity';

@Injectable()
export class NextExpositionService {
  constructor(@InjectModel('NextExposition') private nextExpositionModel: Model<NextExposition>) {}

  async createNextExpo(
    createNextExpositionDto: CreateNextExpositionDto,
  ): Promise<{ newNextExpo: NextExposition }> {
    const newNextExpo = new this.nextExpositionModel(createNextExpositionDto);
    const savedNextExpo = await newNextExpo.save();
    return { newNextExpo: savedNextExpo };
  }

  async findAllNextExpo(): Promise<NextExposition[]> {
    const nextExpoData = await this.nextExpositionModel.find().exec();
    if (!nextExpoData || nextExpoData.length == 0) {
      throw new Error('Next exposition data not found!');
    }
    return nextExpoData;
  }

  async findOneNextExpo(id: string): Promise<NextExposition> {
    const nextExpo = await this.nextExpositionModel.findById(id).exec();
    if (!nextExpo) {
      throw new Error(`Next exposition #${id} not found`);
    }
    return nextExpo;
  }

  async updateNextExpo(
    id: string,
    updateNextExpositionDto: UpdateNextExpositionDto,
  ): Promise<NextExposition> {
    const existingNextExpo = await this.nextExpositionModel.findByIdAndUpdate(
      id,
      updateNextExpositionDto,
      { new: true },
    );
    if (!existingNextExpo) {
      throw new Error(`Next exposition #${id} not found`);
    }
    return existingNextExpo;
  }

  async removeNextExpo(id: string): Promise<NextExposition> {
    const removedNextExpo = await this.nextExpositionModel.findByIdAndDelete(id);
    if (!removedNextExpo) {
      throw new Error(`Next exposition #${id} not found`);
    }
    return removedNextExpo;
  }
}
