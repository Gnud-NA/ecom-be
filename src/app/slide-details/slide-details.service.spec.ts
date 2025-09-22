import { Test, TestingModule } from '@nestjs/testing';
import { SlideDetailsService } from './slide-details.service';

describe('SlideDetailsService', () => {
  let service: SlideDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideDetailsService],
    }).compile();

    service = module.get<SlideDetailsService>(SlideDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
