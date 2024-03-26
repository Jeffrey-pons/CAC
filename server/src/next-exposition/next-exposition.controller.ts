import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Res,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { NextExpositionService } from './next-exposition.service';
import { CreateNextExpositionDto } from './dto/create-next-exposition.dto';
import { UpdateNextExpositionDto } from './dto/update-next-exposition.dto';
import { AdminGuard } from 'src/admin/admin.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('next-exposition')
export class NextExpositionController {
  constructor(private readonly nextExpositionService: NextExpositionService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createNextExpo(
    @Res() response,
    @Body() createNextExpositionDto: CreateNextExpositionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createNextExpositionDto.image = file.path;
      const { newNextExpo } =
        await this.nextExpositionService.createNextExpo(createNextExpositionDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Next exposition created successfully',
        newNextExpo,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Next exposition not created',
        status: 'error',
      });
    }
  }

  @Get()
  async findAllNextExpo(@Res() response) {
    try {
      const nextExpoData = await this.nextExpositionService.findAllNextExpo();
      return response.status(HttpStatus.OK).json({
        message: 'Next exposition data retrieved successfully',
        nextExpoData,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Next exposition data not found!',
        status: 'error',
      });
    }
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findOneNextExpo(@Res() response, @Param('id') id: string) {
    try {
      const nextExpo = await this.nextExpositionService.findOneNextExpo(id);
      return response.status(HttpStatus.OK).json({
        message: 'Next exposition data retrieved successfully',
        nextExpo,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `Next exposition #${id} not found`,
        status: 'error',
      });
    }
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateNextExpo(
    @Res() response,
    @Param('id') id: string,
    @Body() updateNextExpositionDto: UpdateNextExpositionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        updateNextExpositionDto.image = file.path;
      }
      const existingNextExpo = await this.nextExpositionService.updateNextExpo(
        id,
        updateNextExpositionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Next exposition updated successfully',
        existingNextExpo,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error: Next exposition #${id} not found`,
        status: 'error',
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeNextExpo(@Res() response, @Param('id') id: string) {
    try {
      const removedNextExpo = await this.nextExpositionService.removeNextExpo(id);
      return response.status(HttpStatus.OK).json({
        message: 'Next exposition deleted successfully',
        removedNextExpo,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Error: Next exposition #${id} not found`,
        status: 'error',
      });
    }
  }
}
