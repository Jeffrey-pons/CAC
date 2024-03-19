import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as dotenv from "dotenv";

dotenv.config();

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  async createAdmin(@Res() response, @Body() createAdminDto: CreateAdminDto) {
    try {

      const { newAdmin } = await this.adminService.createAdmin(createAdminDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Admin created successfully',
        newAdmin
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Admin not created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('/login')
  async login(@Res() response, @Body() loginDto: { email: string, password: string }) {
    try {
      const result = await this.adminService.login(loginDto.email, loginDto.password);

      return response.status(HttpStatus.OK).json(result);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/:id')
  async updateAdmin(@Res() response, @Param('id') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    try {
      const existingAdmin = await this.adminService.updateAdmin(adminId, updateAdminDto);
      return response.status(HttpStatus.OK).json({
        message: 'Admin has been successfully updated',
        existingAdmin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAdmins(@Res() response) {
    try {
      const adminData = await this.adminService.getAllAdmin();
      return response.status(HttpStatus.OK).json({
        message: 'All Admins data found successfully',
        adminData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getAdmin(@Res() response, @Param('id') adminId: string) {
    try {
      const existingAdmin = await this.adminService.getAdmin(adminId);
      return response.status(HttpStatus.OK).json({
        message: 'Admin found successfully',
        existingAdmin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteAdmin(@Res() response, @Param('id') adminId: string) {
    try {
      const deletedAdmin = await this.adminService.deleteAdmin(adminId);
      return response.status(HttpStatus.OK).json({
        message: 'Admin deleted successfully',
        deletedAdmin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
