import { Injectable } from "@nestjs/common";
import { BaseService } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import { UserRewardPoint } from "./entities/user-reward-point.entity";
import { UserRewardPointRepository } from "./user-reward-point.repository";

@Injectable()
export class UserRewardPointService extends BaseService<UserRewardPoint, UserRewardPointRepository> {
    constructor(private userRewardPointRepo: UserRewardPointRepository, private sequelize: Sequelize) {
        super(userRewardPointRepo);
    }
}
