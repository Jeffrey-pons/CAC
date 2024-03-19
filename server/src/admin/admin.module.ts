import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AuthorizationMiddleware } from '../middlewares/admin.middlewares';
import { RequestMethod } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(
        { path: 'admin/:id', method: RequestMethod.PATCH },
        { path: 'admin/', method: RequestMethod.GET },
        { path: 'admin/:id', method: RequestMethod.GET},
        { path: 'admin/:id', method: RequestMethod.DELETE },
      );
  
  }
}
