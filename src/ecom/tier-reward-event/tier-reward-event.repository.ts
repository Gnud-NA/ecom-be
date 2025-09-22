import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import TierRewardEvent from "@src/ecom/tier-reward-event/entities/tier-reward-event.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class TierRewardEventRepository extends BaseRepositorySequelize<TierRewardEvent> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "TierRewardEvent");
    }
}
