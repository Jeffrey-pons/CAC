import { Test, TestingModule } from '@nestjs/testing';
import { WorkExpoPermanentController } from './work-expo-permanent.controller';
import { WorkExpoPermanentService } from './work-expo-permanent.service';

describe('WorkExpoPermanentController', () => {
  let controller: WorkExpoPermanentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkExpoPermanentController],
      providers: [WorkExpoPermanentService],
    }).compile();

    controller = module.get<WorkExpoPermanentController>(WorkExpoPermanentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
