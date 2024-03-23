import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, Admin],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
