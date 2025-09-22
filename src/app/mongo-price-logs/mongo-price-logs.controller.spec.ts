import { Test, TestingModule } from '@nestjs/testing';
import { MongoPriceLogsController } from './mongo-price-logs.controller';
import { MongoPriceLogsService } from './mongo-price-logs.service';

describe('MongoPriceLogsController', () => {
  let controller: MongoPriceLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoPriceLogsController],
      providers: [MongoPriceLogsService],
    }).compile();

    controller = module.get<MongoPriceLogsController>(MongoPriceLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
