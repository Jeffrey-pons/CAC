import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { AdminGuard } from 'src/admin/admin.guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('archive')
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FilesInterceptor('image', 10, {
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
  async createArchive(
    @Res() response,
    @Body() createArchiveDto: CreateArchiveDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      createArchiveDto.image = files.map((file) => file.path);
      const { newArchive } = await this.archivesService.createArchive(createArchiveDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Archive created successfully',
        newArchive,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Archive not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAllArchives(@Res() response) {
    try {
      const ArchivesData = await this.archivesService.findAllArchives();
      return response.status(HttpStatus.OK).json({
        message: 'Archives data retrieved successfully',
        ArchivesData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Archives not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findOneArchive(@Res() response, @Param('id') id: string) {
    try {
      const archive = await this.archivesService.findOneArchive(id);
      return response.status(HttpStatus.OK).json({
        message: 'Archive data retrieved successfully',
        archive,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Archive not found!',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FilesInterceptor('image', 10, {
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
  async updateArchive(
    @Res() response,
    @Param('id') id: string,
    @Body() updateArchiveDto: UpdateArchiveDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      if (files.length > 0) {
        updateArchiveDto.image = files.map((file) => file.path);
      }
      const existingArchive = await this.archivesService.updateArchive(id, updateArchiveDto);
      return response.status(HttpStatus.OK).json({
        message: 'Archive updated successfully',
        existingArchive,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Archive not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeArchive(@Res() response, @Param('id') id: string) {
    try {
      const deletedArchive = await this.archivesService.deleteArchive(id);
      return response.status(HttpStatus.OK).json({
        message: 'Archive deleted successfully',
        deletedArchive,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Archive not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
