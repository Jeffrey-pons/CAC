import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel: Model<Admin>) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<{ newAdmin: Admin }> {
    const existingAdmin = await this.adminModel.findOne({ email: createAdminDto.email }).exec();
    if (existingAdmin) {
      throw new Error(`Admin with email ${createAdminDto.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const newAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();

    return { newAdmin: savedAdmin };
  }

  async login(email: string, password: string) {
    const admin = await this.getAdminByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.STRONG_KEY, {
      expiresIn: '1h',
    });

    return {
      message: 'Logged in successfully',
      token,
      name: admin.name,
    };
  }

  async getAdminByEmail(email: string): Promise<Admin> {
    const existingAdmin = await this.adminModel.findOne({ email: email }).exec();
    if (!existingAdmin) {
      throw new Error(`Admin with email ${email} not found`);
    }
    return existingAdmin;
  }

  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminModel.findByIdAndUpdate(adminId, updateAdminDto, {
      new: true,
    });
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
    const existingAdmin = await this.adminModel.findById(adminId).exec();
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
