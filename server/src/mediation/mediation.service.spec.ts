import { Test, TestingModule } from '@nestjs/testing';
import { MediationService } from './mediation.service';

describe('MediationService', () => {
  let service: MediationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediationService],
    }).compile();

    service = module.get<MediationService>(MediationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
