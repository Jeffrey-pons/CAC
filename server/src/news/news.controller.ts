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
  UploadedFiles,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AdminGuard } from 'src/admin/admin.guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

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
  async createNews(
    @Res() response,
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      createNewsDto.image = files.map((file) => file.path);
      const { newNews } = await this.newsService.createNews(createNewsDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'News created successfully',
        newNews,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: News not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAllNews(@Res() response) {
    try {
      const newsData = await this.newsService.findAllNews();
      return response.status(HttpStatus.OK).json({
        message: 'News data retrieved successfully',
        newsData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: News not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  async findOneNews(@Res() response, @Param('id') id: string) {
    try {
      const news = await this.newsService.findOneNews(id);
      return response.status(HttpStatus.OK).json({
        message: 'News data retrieved successfully',
        news,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: News not found!',
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
  async updateNews(
    @Res() response,
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      if (files.length > 0) {
        updateNewsDto.image = files.map((file) => file.path);
      }
      const news = await this.newsService.updateNews(id, updateNewsDto);
      return response.status(HttpStatus.OK).json({
        message: 'News updated successfully',
        news,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: News not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeNews(@Res() response, @Param('id') id: string) {
    try {
      const news = await this.newsService.removeNews(id);
      return response.status(HttpStatus.OK).json({
        message: 'News deleted successfully',
        news,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: News not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
