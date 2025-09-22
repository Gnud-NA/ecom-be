import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseService, BaseUpdatedResponse } from "@src/base";
import { UpdateRewardEventDto } from "@src/ecom/reward-event/dto/update-reward-event.dto";
import { RewardEventRepository } from "@src/ecom/reward-event/reward-event.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { Sequelize } from "sequelize-typescript";
import { CreateRewardEventDto } from "./dto/create-reward-event.dto";
import { RewardEventFilter } from "./dto/reward-event.dto";
import RewardEvent from "./entities/reward-event.entity";

@Injectable()
export class RewardEventService extends BaseService<RewardEvent, RewardEventRepository> {
    constructor(private rewardEventRepo: RewardEventRepository, private sequelize: Sequelize) {
        super(rewardEventRepo);
    }

    async createRewardEvent(createRewardEventDto: CreateRewardEventDto): Promise<BaseCreatedResponse<RewardEvent>> {
        try {
            const newRewardEvent = await this.rewardEventRepo.create(createRewardEventDto);
            return {
                status: true,
                data: newRewardEvent,
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: RewardEventFilter): Promise<BaseResponse<RewardEvent[]>> {
        const { count, data } = await this.rewardEventRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        return { count, data: plainToInstance(RewardEvent, data, { excludeExtraneousValues: true }) };
    }

    async findOne(id: number): Promise<RewardEvent> {
        const rewardEvent = await this.rewardEventRepo.findOne({ where: { id } });
        if (!rewardEvent) {
            throw new BadRequestException("Reward Event not found");
        }
        return rewardEvent;
    }

    async update(id: number, updateRewardEventDto: UpdateRewardEventDto): Promise<BaseUpdatedResponse<RewardEvent>> {
        const rewardEvent = await this.rewardEventRepo.findById(id);
        if (!rewardEvent) {
            throw new BadRequestException("Reward Event not found");
        }
        await rewardEvent.update({ ...rewardEvent, ...updateRewardEventDto });
        return {
            status: true,
            data: rewardEvent,
        };
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        try {
            const rewardEvent = await this.rewardEventRepo.findOne({ where: { id } });
            if (!rewardEvent) {
                throw new BadRequestException("Reward Event not found");
            }
            const result = await this.sequelize.transaction(async (t) => {
                const rewardEvent = await this.rewardEventRepo.findById(id);
                if (!rewardEvent) {
                    throw new BadRequestException("Reward Event not found");
                }
                await this.rewardEventRepo.delete(id, t);
                return true;
            });
            return { status: result };
        } catch (error) {
            throw error;
        }
    }
}
