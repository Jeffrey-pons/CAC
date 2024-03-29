import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') private newsModel: Model<News>) {}

  async createNews(createNewsDto: CreateNewsDto): Promise<{ newNews: News }> {
    const newNews = new this.newsModel(createNewsDto);
    const savedNews = await newNews.save();
    return { newNews: savedNews };
  }

  async findAllNews(): Promise<News[]> {
    const newsData = await this.newsModel.find().exec();
    if (!newsData || newsData.length == 0) {
      throw new Error('News data not found!');
    }
    return newsData;
  }

  async findOneNews(id: string):Promise<News> {
    const news = await this.newsModel.findById(id).exec();
    if (!news) {
      throw new Error(`News #${id} not found`);
    }
    return news;
  }

  async updateNews(id: string, updateNewsDto: UpdateNewsDto):Promise<News> {
    const existingNews = await this.newsModel.findByIdAndUpdate(id, updateNewsDto, {
      new: true,
      });
    if (!existingNews) {
      throw new Error(`News #${id} not found`);
    }
    return existingNews;
  }

  async removeNews(id: string):Promise<News> {
    const deletedNews = await this.newsModel.findByIdAndDelete(id);
    if (!deletedNews) {
      throw new Error(`News #${id} not found`);
    }
    return deletedNews;
  }
}
