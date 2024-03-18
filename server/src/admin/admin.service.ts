import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Model } from 'mongoose';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {

  constructor(@InjectModel('Admin') private adminModel:Model<Admin>) { }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return newAdmin.save();
 }
 async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
     const existingAdmin = await this.adminModel.findByIdAndUpdate(adminId, updateAdminDto, { new: true });
    if (!existingAdmin) {
      throw new Error(`Admin #${adminId} not found`);
    }
    return existingAdmin;
 }
 async getAllAdmin(): Promise<Admin[]> {
     const adminData = await this.adminModel.find();
     if (!adminData || adminData.length == 0) {
         throw new Error('Admins data not found!');
     }
     return adminData;
 }
 async getAdmin(adminId: string): Promise<Admin> {
    const existingAdmin = await     this.adminModel.findById(adminId).exec();
    if (!existingAdmin) {
     throw new Error(`Admins #${adminId} not found`);
    }
    return existingAdmin;
 }
 async deleteAdmin(adminId: string): Promise<Admin> {
     const deletedAdmin = await this.adminModel.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      throw new Error(`Admin #${adminId} not found`);
    }
    return deletedAdmin;
 }
 }
