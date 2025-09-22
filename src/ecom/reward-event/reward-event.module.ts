import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import RewardEvent from "./entities/reward-event.entity";
import { RewardEventController } from "./reward-event.controller";
import { RewardEventRepository } from "./reward-event.repository";
import { RewardEventService } from "./reward-event.service";

@Module({
    imports: [SequelizeModule.forFeature([RewardEvent])],
    controllers: [RewardEventController],
    providers: [RewardEventService, RewardEventRepository],
    exports: [RewardEventService],
})
export class RewardEventModule {}
