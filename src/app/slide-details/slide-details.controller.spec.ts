import { Test, TestingModule } from '@nestjs/testing';
import { SlideDetailsController } from './slide-details.controller';
import { SlideDetailsService } from './slide-details.service';

describe('SlideDetailsController', () => {
  let controller: SlideDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlideDetailsController],
      providers: [SlideDetailsService],
    }).compile();

    controller = module.get<SlideDetailsController>(SlideDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
