import { Test, TestingModule } from '@nestjs/testing';
import { NextExpositionService } from './next-exposition.service';

describe('NextExpositionService', () => {
  let service: NextExpositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NextExpositionService],
    }).compile();

    service = module.get<NextExpositionService>(NextExpositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
