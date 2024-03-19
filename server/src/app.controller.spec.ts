import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AppModule } from './app.module';
import { Admin, AdminSchema } from './admin/entities/admin.entity';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv";

dotenv.config();


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, AdminController],
      providers: [AppModule],
        imports: [
          MongooseModule.forRoot(process.env.MONGO_URL),
          MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
        ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
