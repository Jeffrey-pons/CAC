import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AdminGuard } from 'src/admin/admin.guards';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/register')
  async createMember(@Res() response, @Body() createMemberDto: CreateMemberDto) {
    try {
      const { newMember } = await this.memberService.createMember(createMemberDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Member created successfully',
        newMember,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Member not created!',
        error: err.message,
      });
    }
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAllMembers(@Res() response) {
    try {
      const { members } = await this.memberService.findAllMembers();
      return response.status(HttpStatus.OK).json({
        message: 'All members found successfully',
        members,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: err.message,
        error: 'Not Found',
      });
    }
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findOneMember(@Res() response, @Param('id') id: string) {
    try {
      const member = await this.memberService.findOneMember(id);
      return response.status(HttpStatus.OK).json({
        message: 'Member found successfully',
        member,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: err.message,
        error: 'Not Found',
      });
    }
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async updateMember(
    @Res() response,
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    try {
      const updatedMember = await this.memberService.updateMember(id, updateMemberDto);
      return response.status(HttpStatus.OK).json({
        message: 'Member updated successfully',
        updatedMember,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Member not updated!',
        error: err.message,
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeMember(@Res() response, @Param('id') id: string) {
    try {
      const deletedMember = await this.memberService.removeMember(id);
      return response.status(HttpStatus.OK).json({
        message: 'Member deleted successfully',
        deletedMember,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: err.message,
        error: 'Not Found',
      });
    }
  }
}
