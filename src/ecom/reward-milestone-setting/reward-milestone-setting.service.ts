import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { Op } from "sequelize";
import { CreateRewardMilestoneSettingDto } from "./dto/create-reward-milestone-setting.dto";
import { RewardMilestoneSettingFilter } from "./dto/reward-milestone-setting.dto";
import { UpdateRewardMilestoneSettingDto } from "./dto/update-reward-milestone-setting.dto";
import { RewardMilestoneSetting } from "./entities/reward-milestone-setting.entity";
import { RewardMilestoneSettingRepository } from "./reward-milestone-setting.repository";

@Injectable()
export class RewardMilestoneSettingService {
    constructor(private rewardMilestoneSettingRepo: RewardMilestoneSettingRepository) {}

    async create(
        createRewardMilestoneSettingDto: CreateRewardMilestoneSettingDto
    ): Promise<BaseCreatedResponse<RewardMilestoneSetting>> {
        try {
            const rewardMilestoneSetting = await this.rewardMilestoneSettingRepo.findOne({
                where: {
                    pointThreshold: createRewardMilestoneSettingDto.pointThreshold,
                },
            });
            if (rewardMilestoneSetting) {
                throw new BadRequestException("The threshold point is unique");
            }
            const newRewardMilestoneSetting = await this.rewardMilestoneSettingRepo.create(
                createRewardMilestoneSettingDto
            );

            return {
                status: true,
                data: newRewardMilestoneSetting,
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: RewardMilestoneSettingFilter): Promise<BaseResponse<RewardMilestoneSetting[]>> {
        const { count, data } = await this.rewardMilestoneSettingRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        return { count, data: plainToInstance(RewardMilestoneSetting, data) };
    }

    async findOne(id: number): Promise<RewardMilestoneSetting> {
        const rewardMilestoneSetting = await this.rewardMilestoneSettingRepo.findOne({ where: { id } });
        if (!rewardMilestoneSetting) {
            throw new BadRequestException("Reward Milestone Setting not found");
        }
        return rewardMilestoneSetting;
    }

    async update(
        id: number,
        updateRewardMilestoneSettingDto: UpdateRewardMilestoneSettingDto
    ): Promise<BaseUpdatedResponse<RewardMilestoneSetting>> {
        const rewardMilestoneSetting = await this.rewardMilestoneSettingRepo.findById(id);
        if (!rewardMilestoneSetting) {
            throw new BadRequestException("Reward Milestone Setting not found");
        }

        const existingRewardMilestoneSetting = await this.rewardMilestoneSettingRepo.findOne({
            where: {
                pointThreshold: updateRewardMilestoneSettingDto.pointThreshold,
                id: {
                    [Op.ne]: id,
                },
            },
        });
        if (existingRewardMilestoneSetting) {
            throw new BadRequestException("The threshold point is unique");
        }

        const newRewardMilestoneSettingDto = plainToInstance(
            UpdateRewardMilestoneSettingDto,
            updateRewardMilestoneSettingDto,
            {
                excludeExtraneousValues: true,
            }
        );

        await this.rewardMilestoneSettingRepo.updateById(id, newRewardMilestoneSettingDto);

        const result = await this.rewardMilestoneSettingRepo.findOne({
            where: { id },
        });

        return {
            status: true,
            data: result,
        };
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        try {
            const rewardMilestoneSetting = await this.rewardMilestoneSettingRepo.findOne({ where: { id } });
            if (!rewardMilestoneSetting) {
                throw new BadRequestException("Reward Milestone Setting not found");
            }
            await this.rewardMilestoneSettingRepo.delete(id);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}
