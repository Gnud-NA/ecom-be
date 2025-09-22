import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserAchievedThresholdsRepository } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.repository";
import { UserAchievedThresholds } from "./entities/user-achieved-thresholds.entity";
import { UserAchievedThresholdsService } from "./user-achieved-thresholds.service";

@Module({
    imports: [SequelizeModule.forFeature([UserAchievedThresholds])],
    controllers: [],
    providers: [UserAchievedThresholdsService, UserAchievedThresholdsRepository],
    exports: [UserAchievedThresholdsService],
})
export class UserAchievedThresholdsModule {}
