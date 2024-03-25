import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {

constructor(@InjectModel('Member') private memberModel: Model<Member>) {}

  async createMember(createMemberDto: CreateMemberDto): Promise<{ newMember: Member }> {
    const existingMember = await this.memberModel
      .findOne({ email: createMemberDto.email })
      .exec();
    if (existingMember) {
      throw new Error(
        `Member with email ${createMemberDto.email} already exists`,
      );
    }

    const newMember = new this.memberModel(createMemberDto);
    const savedMember = await newMember.save();

    return { newMember: savedMember };
  }

  async findAllMembers():Promise<{members: Member[]}>{
    const members = await this.memberModel.find();
    if (!members || members.length === 0) {
      throw new Error('No members found');
    }
    return { members };
  }

  async findOneMember(id: string): Promise<Member> {
    const existingMember = this.memberModel.findById(id).exec();
    if (!existingMember) {
      throw new Error(`Member with id ${id} not found`);
    }
    return existingMember;
  }

  async updateMember(id: string, updateMemberDto: UpdateMemberDto):Promise<Member>{
    const updatedAdmin = await this.memberModel.findByIdAndUpdate(id, updateMemberDto, { new: true });
    if (!updatedAdmin) {
      throw new Error(`Member with id ${id} not found`);
    }
    return updatedAdmin;
  }

  async removeMember(id: string):Promise<Member>{ 
    const deletedMember = await this.memberModel.findByIdAndDelete(id);
    if (!deletedMember) {
      throw new Error(`Member with id ${id} not found`);
    }
    return deletedMember;
  }
  
}
