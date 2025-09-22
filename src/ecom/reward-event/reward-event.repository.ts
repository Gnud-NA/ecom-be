import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import RewardEvent from "@src/ecom/reward-event/entities/reward-event.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class RewardEventRepository extends BaseRepositorySequelize<RewardEvent> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "RewardEvent");
    }
}
