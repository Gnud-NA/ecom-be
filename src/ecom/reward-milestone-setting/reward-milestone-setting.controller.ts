import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { CreateRewardMilestoneSettingDto } from "@src/ecom/reward-milestone-setting/dto/create-reward-milestone-setting.dto";
import { RewardMilestoneSettingFilter } from "@src/ecom/reward-milestone-setting/dto/reward-milestone-setting.dto";
import { UpdateRewardMilestoneSettingDto } from "@src/ecom/reward-milestone-setting/dto/update-reward-milestone-setting.dto";
import RewardMilestoneSetting from "@src/ecom/reward-milestone-setting/entities/reward-milestone-setting.entity";
import { RewardMilestoneSettingService } from "@src/ecom/reward-milestone-setting/reward-milestone-setting.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/reward-milestone-settings")
@ApiTags("Reward Milestone Settings")
@ApiBearerAuth()
@UseGuards(AdminGuard)
@UseInterceptors(ContextInterceptor)
export class RewardMilestoneSettingController {
    constructor(private readonly rewardMilestoneSettingService: RewardMilestoneSettingService) {}

    @Post()
    async create(
        @Body() createRewardMilestoneSettingDto: CreateRewardMilestoneSettingDto
    ): Promise<BaseCreatedResponse<RewardMilestoneSetting>> {
        return await this.rewardMilestoneSettingService.create(createRewardMilestoneSettingDto);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateRewardMilestoneSettingDto: UpdateRewardMilestoneSettingDto
    ): Promise<BaseUpdatedResponse<RewardMilestoneSetting>> {
        return await this.rewardMilestoneSettingService.update(+id, updateRewardMilestoneSettingDto);
    }

    @ApiExtraModels(RewardMilestoneSetting)
    @ApiOkResponse({
        description: "The Reward Milestone Setting records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(RewardMilestoneSetting),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: RewardMilestoneSettingFilter): Promise<BaseResponse<RewardMilestoneSetting[]>> {
        return this.rewardMilestoneSettingService.findAll(request);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<RewardMilestoneSetting> {
        return await this.rewardMilestoneSettingService.findOne(+id);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<BaseDeletedResponse> {
        return await this.rewardMilestoneSettingService.delete(+id);
    }
}
