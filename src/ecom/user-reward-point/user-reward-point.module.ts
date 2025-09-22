import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserRewardPointRepository } from "@src/ecom/user-reward-point/user-reward-point.repository";
import { UserRewardPointService } from "@src/ecom/user-reward-point/user-reward-point.service";
import { UserRewardPoint } from "./entities/user-reward-point.entity";

@Module({
    imports: [SequelizeModule.forFeature([UserRewardPoint])],
    controllers: [],
    providers: [UserRewardPointService, UserRewardPointRepository],
    exports: [UserRewardPointService],
})
export class UserRewardPointModule {}
