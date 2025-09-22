import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import UserAchievedThresholds from "@src/ecom/user-achieved-thresholds/entities/user-achieved-thresholds.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UserAchievedThresholdsRepository extends BaseRepositorySequelize<UserAchievedThresholds> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "UserAchievedThresholds");
    }
}
