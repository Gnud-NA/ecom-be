import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  MongoPriceLog,
  MongoPriceLogSchema,
} from "@src/app/mongo-price-logs/entities/mongo-price-log.schema";
import { MongoPriceLogRepository } from "@src/app/mongo-price-logs/mongo-price-logs.repository";
import { MongoPriceLogsController } from "./mongo-price-logs.controller";
import { MongoPriceLogsService } from "./mongo-price-logs.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoPriceLog.name, schema: MongoPriceLogSchema },
    ]),
  ],
  controllers: [MongoPriceLogsController],
  providers: [MongoPriceLogsService, MongoPriceLogRepository],
  exports: [MongoPriceLogsService, MongoPriceLogRepository],
})
export class MongoPriceLogsModule {}
