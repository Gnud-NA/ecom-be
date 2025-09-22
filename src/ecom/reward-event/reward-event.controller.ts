import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { CreateRewardEventDto } from "@src/ecom/reward-event/dto/create-reward-event.dto";
import { RewardEventFilter } from "@src/ecom/reward-event/dto/reward-event.dto";
import { UpdateRewardEventDto } from "@src/ecom/reward-event/dto/update-reward-event.dto";
import RewardEvent from "@src/ecom/reward-event/entities/reward-event.entity";
import { RewardEventService } from "@src/ecom/reward-event/reward-event.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/reward-events")
@ApiTags("Reward Events")
@UseInterceptors(ContextInterceptor)
export class RewardEventController {
    constructor(private readonly rewardEventService: RewardEventService) {}

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    async create(@Body() createRewardEventDto: CreateRewardEventDto): Promise<BaseCreatedResponse<RewardEvent>> {
        return await this.rewardEventService.createRewardEvent(createRewardEventDto);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateRewardEventDto: UpdateRewardEventDto
    ): Promise<BaseUpdatedResponse<RewardEvent>> {
        return await this.rewardEventService.update(+id, updateRewardEventDto);
    }

    @ApiExtraModels(RewardEvent)
    @ApiOkResponse({
        description: "The Reward Event records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(RewardEvent),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: RewardEventFilter): Promise<BaseResponse<RewardEvent[]>> {
        return this.rewardEventService.findAll(request);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<RewardEvent> {
        return await this.rewardEventService.findOne(+id);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<BaseDeletedResponse> {
        return await this.rewardEventService.delete(+id);
    }
}
