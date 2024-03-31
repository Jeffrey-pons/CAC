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
import { MediationService } from './mediation.service';
import { CreateMediationDto } from './dto/create-mediation.dto';
import { UpdateMediationDto } from './dto/update-mediation.dto';
import { AdminGuard } from 'src/admin/admin.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('mediation')
export class MediationController {
  constructor(private readonly mediationService: MediationService) {}

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
  async createMediation(
    @Res() response,
    @Body() createMediationDto: CreateMediationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createMediationDto.image = file.path;
      const { newMediation } = await this.mediationService.createMediation(createMediationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Mediation created successfully',
        newMediation,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Mediation not created',
        status: 'error',
      });
    }
  }

  @Get()
  async findAllMediation(@Res() response) {
    try {
      const mediationData = await this.mediationService.findAllMediation();
      return response.status(HttpStatus.OK).json({
        message: 'Mediation data retrieved successfully',
        mediationData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Mediation data not found',
        status: 'error',
      });
    }
  }

  @Get('/:id')
  async findOneMediation(@Res() response, @Param('id') id: string) {
    try {
      const mediation = await this.mediationService.findOneMediation(id);
      return response.status(HttpStatus.OK).json({
        message: 'Mediation data retrieved successfully',
        mediation,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Error: Mediation data not found',
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
  async updateMediation(
    @Res() response,
    @Param('id') id: string,
    @Body() updateMediationDto: UpdateMediationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        updateMediationDto.image = file.path;
      }
      const existingMediation = await this.mediationService.updateMediation(id, updateMediationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Mediation updated successfully',
        existingMediation,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Mediation not updated',
        status: 'error',
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeMediation(@Res() response, @Param('id') id: string) {
    try {
      const removedMediation = await this.mediationService.removeMediation(id);
      return response.status(HttpStatus.OK).json({
        message: 'Mediation deleted successfully',
        removedMediation,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Mediation not deleted',
        status: 'error',
      });
    }
  }
}
