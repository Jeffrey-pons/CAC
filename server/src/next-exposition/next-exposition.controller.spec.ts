import { Test, TestingModule } from '@nestjs/testing';
import { NextExpositionController } from './next-exposition.controller';
import { NextExpositionService } from './next-exposition.service';

describe('NextExpositionController', () => {
  let controller: NextExpositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NextExpositionController],
      providers: [NextExpositionService],
    }).compile();

    controller = module.get<NextExpositionController>(NextExpositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
