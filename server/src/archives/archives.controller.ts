import { Controller, Get, Post, Body, Res, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { AdminGuard } from 'src/admin/admin.guards';

@Controller('archive')
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}

  @Post()
  @UseGuards(AdminGuard)
  async createArchive(@Res() response, @Body() createArchiveDto: CreateArchiveDto) {
   try {
 
    const { newArchive } = await this.archivesService.createArchive(createArchiveDto);
    return response.status(HttpStatus.CREATED).json({
      message: 'Archive created successfully',
      newArchive
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
  @UseGuards(AdminGuard)
  async findAllArchives(@Res() response) {
   try {

    const ArchivesData = await this.archivesService.findAllArchives();
    return response.status(HttpStatus.OK).json({
      message: 'Archives data retrieved successfully',
      ArchivesData
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
        archive
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
  async updateArchive(@Res() response, @Param('id') id: string, @Body() updateArchiveDto: UpdateArchiveDto) {
   try {

    const existingArchive = await this.archivesService.updateArchive(id, updateArchiveDto);
    return response.status(HttpStatus.OK).json({
      message: 'Archive updated successfully',
      existingArchive
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
      deletedArchive
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
