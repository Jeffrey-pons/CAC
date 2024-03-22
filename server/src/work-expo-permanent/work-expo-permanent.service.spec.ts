import { Test, TestingModule } from '@nestjs/testing';
import { WorkExpoPermanentService } from './work-expo-permanent.service';

describe('WorkExpoPermanentService', () => {
  let service: WorkExpoPermanentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkExpoPermanentService],
    }).compile();

    service = module.get<WorkExpoPermanentService>(WorkExpoPermanentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
