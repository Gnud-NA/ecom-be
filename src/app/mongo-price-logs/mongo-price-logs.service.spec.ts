import { Test, TestingModule } from '@nestjs/testing';
import { MongoPriceLogsService } from './mongo-price-logs.service';

describe('MongoPriceLogsService', () => {
  let service: MongoPriceLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoPriceLogsService],
    }).compile();

    service = module.get<MongoPriceLogsService>(MongoPriceLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
