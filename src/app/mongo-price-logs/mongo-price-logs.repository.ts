import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MongoPriceLog } from "@src/app/mongo-price-logs/entities/mongo-price-log.schema";
import { BaseRepositoryMongoDB } from "@src/base";
import { Model } from "mongoose";

@Injectable()
export class MongoPriceLogRepository extends BaseRepositoryMongoDB<MongoPriceLog> {
  constructor(
    @InjectModel(MongoPriceLog.name) public model: Model<MongoPriceLog>
  ) {
    super(model);
  }
}
