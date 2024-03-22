import { UpdateAdminDto } from './../admin/dto/update-admin.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { Archive } from './entities/archive.entity';
import { Model } from 'mongoose';

@Injectable()
export class ArchivesService {
  constructor(@InjectModel('Archive') private archiveModel: Model<Archive>) {}
  
  async createArchive(createArchiveDto: CreateArchiveDto): Promise<{ newArchive: Archive}> {
    const newArchive = new this.archiveModel(createArchiveDto);
    const savedArchives = await newArchive.save();
    return { newArchive: savedArchives};
  }

  async findAllArchives(): Promise<Archive[]> {
    const archiveData = await this.archiveModel.find().exec();
    if (!archiveData || archiveData.length == 0) {
        throw new Error('Archives data not found!');
    }
    return archiveData
  }
 
  async findOneArchive(id: string): Promise<Archive> {
    const archive = await this.archiveModel.findById(id).exec();
    if (!archive) {
      throw new Error(`Archive #${id} not found`);
    }
    return archive;
  }

  async updateArchive(id: string, updateArchiveDto: UpdateArchiveDto): Promise<Archive> {
    const existingArchive = await this.archiveModel.findByIdAndUpdate(id, updateArchiveDto, { new: true });
    if (!existingArchive) {
      throw new Error(`Archive #${id} not found`);
    }
    return existingArchive;
  }

  async deleteArchive(id: string): Promise<Archive> {
    const deletedArchive = await this.archiveModel.findByIdAndDelete(id);
    if (!deletedArchive) {
      throw new Error(`Archive #${id} not found`);
    }
    return deletedArchive;
  }
}
