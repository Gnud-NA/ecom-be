import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RewardEventRepository } from "@src/ecom/reward-event/reward-event.repository";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import TierRewardEvent from "./entities/tier-reward-event.entity";
import { TierRewardEventController } from "./tier-reward-event.controller";
import { TierRewardEventRepository } from "./tier-reward-event.repository";
import { TierRewardEventService } from "./tier-reward-event.service";

@Module({
    imports: [SequelizeModule.forFeature([TierRewardEvent])],
    controllers: [TierRewardEventController],
    providers: [TierRewardEventService, TierRewardEventRepository, TierRepository, RewardEventRepository],
    exports: [TierRewardEventService],
})
export class TierRewardEventModule {}
