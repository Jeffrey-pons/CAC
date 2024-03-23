import { Injectable } from '@nestjs/common';
import { CreateWorkExpoPermanentDto } from './dto/create-work-expo-permanent.dto';
import { UpdateWorkExpoPermanentDto } from './dto/update-work-expo-permanent.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Artwork } from './entities/work-expo-permanent.entity';

@Injectable()
export class WorkExpoPermanentService {
  constructor(@InjectModel('Artwork') private artworkModel: Model<Artwork>) {}

  async createArtWork(
    createWorkExpoPermanentDto: CreateWorkExpoPermanentDto,
  ): Promise<{ newArtWork: Artwork }> {
    const newArtWork = new this.artworkModel(createWorkExpoPermanentDto);
    const savedArtWork = await newArtWork.save();
    return { newArtWork: savedArtWork };
  }

  async findAllArtWork(): Promise<Artwork[]> {
    const artWorkData = await this.artworkModel.find().exec();
    if (!artWorkData || artWorkData.length == 0) {
      throw new Error('Artwork data not found!');
    }
    return artWorkData;
  }

  async findOneArtWork(id: string): Promise<Artwork> {
    const artWork = await this.artworkModel.findById(id).exec();
    if (!artWork) {
      throw new Error(`Artwork #${id} not found`);
    }
    return artWork;
  }

  async updateArtWork(
    id: string,
    updateWorkExpoPermanentDto: UpdateWorkExpoPermanentDto,
  ): Promise<Artwork> {
    const existingArtWork = await this.artworkModel.findByIdAndUpdate(
      id,
      updateWorkExpoPermanentDto,
      { new: true },
    );
    if (!existingArtWork) {
      throw new Error(`Artwork #${id} not found`);
    }
    return existingArtWork;
  }

  async removeArtWork(id: string): Promise<Artwork> {
    const removedArtWork = await this.artworkModel.findByIdAndDelete(id);
    if (!removedArtWork) {
      throw new Error(`Artwork #${id} not found`);
    }
    return removedArtWork;
  }
}
