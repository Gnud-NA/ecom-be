import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import RewardMilestoneSetting from "@src/ecom/reward-milestone-setting/entities/reward-milestone-setting.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class RewardMilestoneSettingRepository extends BaseRepositorySequelize<RewardMilestoneSetting> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "RewardMilestoneSetting");
    }
}
