import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import RewardMilestoneSetting from "./entities/reward-milestone-setting.entity";
import { RewardMilestoneSettingController } from "./reward-milestone-setting.controller";
import { RewardMilestoneSettingRepository } from "./reward-milestone-setting.repository";
import { RewardMilestoneSettingService } from "./reward-milestone-setting.service";

@Module({
    imports: [SequelizeModule.forFeature([RewardMilestoneSetting])],
    controllers: [RewardMilestoneSettingController],
    providers: [RewardMilestoneSettingService, RewardMilestoneSettingRepository, TierRepository],
    exports: [RewardMilestoneSettingService],
})
export class RewardMilestoneSettingModule {}
