import { Controller, Get, Post, Body, Patch, Res, Param, Delete,  HttpStatus, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WorkExpoPermanentService } from './work-expo-permanent.service';
import { CreateWorkExpoPermanentDto } from './dto/create-work-expo-permanent.dto';
import { UpdateWorkExpoPermanentDto } from './dto/update-work-expo-permanent.dto';
import { AdminGuard } from 'src/admin/admin.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('work-expo-permanent')
export class WorkExpoPermanentController {
  constructor(private readonly workExpoPermanentService: WorkExpoPermanentService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req: any, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async createArtWork(@Res() response, @Body() createWorkExpoPermanentDto: CreateWorkExpoPermanentDto, @UploadedFile() file: Express.Multer.File) {
    try {
      createWorkExpoPermanentDto.image = file.path;
      const { newArtWork } = await this.workExpoPermanentService.createArtWork(createWorkExpoPermanentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Artwork created successfully',
        newArtWork
      });

    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Artwork not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAllArtWorks(@Res() response) {
    try {
      const artWorkData = await this.workExpoPermanentService.findAllArtWork();
      return response.status(HttpStatus.OK).json({
        message: 'Artworks data retrieved successfully',
        artWorkData
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Artworks not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findOneArtWork(@Res() response, @Param('id') id: string) {
   try {
    const artWork = await this.workExpoPermanentService.findOneArtWork(id);
    return response.status(HttpStatus.OK).json({
      message: 'Artwork data retrieved successfully',
      artWork
    });

   } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Artwork not found!',
      error: 'Bad Request',
    });
  }
  }


  @Patch('/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req: any, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async updateArtWork(@Res() response, @Param('id') id: string, @Body() updateWorkExpoPermanentDto: UpdateWorkExpoPermanentDto, @UploadedFile() file: Express.Multer.File) {
  try {
    if (file) {
      updateWorkExpoPermanentDto.image = file.path;
    }
    const existingArtWork = await this.workExpoPermanentService.updateArtWork(id, updateWorkExpoPermanentDto);
    return response.status(HttpStatus.OK).json({
      message: 'Artwork updated successfully',
      existingArtWork
    });

  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Artwork not updated!',
    error: 'Bad Request',
  });

} 
}

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeArtWork(@Res() response, @Param('id') id: string) {
    try {
      const removedArtWork = await this.workExpoPermanentService.removeArtWork(id);
      return response.status(HttpStatus.OK).json({
        message: 'Artwork deleted successfully',
        removedArtWork
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Artwork not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
