import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseService, BaseUpdatedResponse } from "@src/base";
import { RewardEvent } from "@src/ecom/reward-event/entities/reward-event.entity";
import { RewardEventRepository } from "@src/ecom/reward-event/reward-event.repository";
import { UpdateTierRewardEventDto } from "@src/ecom/tier-reward-event/dto/update-tier-reward-event.dto";
import { TierRewardEventRepository } from "@src/ecom/tier-reward-event/tier-reward-event.repository";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { Sequelize } from "sequelize-typescript";
import { CreateTierRewardEventDto } from "./dto/create-tier-reward-event.dto";
import { TierRewardEventFilter } from "./dto/tier-reward-event.dto";
import TierRewardEvent from "./entities/tier-reward-event.entity";

@Injectable()
export class TierRewardEventService extends BaseService<TierRewardEvent, TierRewardEventRepository> {
    constructor(
        private tierRewardEventRepo: TierRewardEventRepository,
        private tierRepo: TierRepository,
        private rewardEventRepo: RewardEventRepository,
        private sequelize: Sequelize
    ) {
        super(tierRewardEventRepo);
    }

    async createTierRewardEvent(
        createTierRewardEventDto: CreateTierRewardEventDto
    ): Promise<BaseCreatedResponse<TierRewardEvent>> {
        try {
            const tier = await this.tierRepo.findOne({ where: { id: createTierRewardEventDto.tierId } });
            if (!tier) {
                throw new BadRequestException("Tier not found");
            }
            const rewardEvent = await this.rewardEventRepo.findOne({
                where: { id: createTierRewardEventDto.rewardEventId },
            });
            if (!rewardEvent) {
                throw new BadRequestException("Reward event not found");
            }
            const newTierRewardEvent = await this.tierRewardEventRepo.create(createTierRewardEventDto);
            return {
                status: true,
                data: newTierRewardEvent,
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: TierRewardEventFilter): Promise<BaseResponse<TierRewardEvent[]>> {
        const { count, data } = await this.tierRewardEventRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        return { count, data: data };
    }

    async findOne(id: number): Promise<TierRewardEvent> {
        const tierRewardEvent = await this.tierRewardEventRepo.findOne({
            where: { id },
            include: [
                { model: Tier, as: "tier" },
                { model: RewardEvent, as: "rewardEvent" },
            ],
        });
        if (!tierRewardEvent) {
            throw new BadRequestException("Tier Reward Event not found");
        }
        return tierRewardEvent;
    }

    async update(
        id: number,
        updateTierRewardEventDto: UpdateTierRewardEventDto
    ): Promise<BaseUpdatedResponse<TierRewardEvent>> {
        const tierRewardEvent = await this.tierRewardEventRepo.findOne({ where: { id } });
        if (!tierRewardEvent) {
            throw new BadRequestException("Tier Reward Event not found");
        }

        const updateDto = plainToInstance(UpdateTierRewardEventDto, updateTierRewardEventDto, {
            excludeExtraneousValues: true,
        });

        await this.tierRewardEventRepo.updateById(id, updateDto);
        return {
            status: true,
            data: await this.tierRewardEventRepo.findOne({ where: { id } }),
        };
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        try {
            const tierRewardEvent = await this.tierRewardEventRepo.findOne({ where: { id } });
            if (!tierRewardEvent) {
                throw new BadRequestException("Tier Reward Event not found");
            }
            await this.tierRewardEventRepo.delete(id);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}
