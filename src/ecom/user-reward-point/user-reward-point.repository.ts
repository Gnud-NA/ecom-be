import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { UserRewardPoint } from "@src/ecom/user-reward-point/entities/user-reward-point.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UserRewardPointRepository extends BaseRepositorySequelize<UserRewardPoint> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "UserRewardPoint");
    }
}
