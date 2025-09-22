import { Inject, Injectable } from "@nestjs/common";
import { FilterMongoPriceLogsDto } from "@src/app/mongo-price-logs/dto/mongo-price-log.dto";
import { MongoPriceLogDocument } from "@src/app/mongo-price-logs/entities/mongo-price-log.schema";
import { MongoPriceLogRepository } from "@src/app/mongo-price-logs/mongo-price-logs.repository";
import { BaseResponse } from "@src/base";
import { CreateMongoPriceLogDto } from "./dto/create-mongo-price-log.dto";

@Injectable()
export class MongoPriceLogsService {
  constructor(
    @Inject(MongoPriceLogRepository)
    private mongoPriceLogRepository: MongoPriceLogRepository
  ) {}

  async create(createMongoPriceLogDto: CreateMongoPriceLogDto) {
    return this.mongoPriceLogRepository.create(createMongoPriceLogDto);
  }

  async findAll(
    filter?: FilterMongoPriceLogsDto
  ): Promise<BaseResponse<MongoPriceLogDocument[]>> {
    const res = await this.mongoPriceLogRepository.getAll(filter ?? {});
    const count = await this.mongoPriceLogRepository.count(filter ?? {});
    return {
      data: res,
      count: count as number,
    };
  }
  async count(filter?: FilterMongoPriceLogsDto): Promise<number | Number> {
    return await this.mongoPriceLogRepository.count(filter ?? {});
  }
}
