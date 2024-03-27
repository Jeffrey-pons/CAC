import { Test, TestingModule } from '@nestjs/testing';
import { MediationController } from './mediation.controller';
import { MediationService } from './mediation.service';

describe('MediationController', () => {
  let controller: MediationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediationController],
      providers: [MediationService],
    }).compile();

    controller = module.get<MediationController>(MediationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
