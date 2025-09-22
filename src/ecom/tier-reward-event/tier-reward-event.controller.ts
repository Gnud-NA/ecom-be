import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { CreateTierRewardEventDto } from "@src/ecom/tier-reward-event/dto/create-tier-reward-event.dto";
import { TierRewardEventFilter } from "@src/ecom/tier-reward-event/dto/tier-reward-event.dto";
import { UpdateTierRewardEventDto } from "@src/ecom/tier-reward-event/dto/update-tier-reward-event.dto";
import TierRewardEvent from "@src/ecom/tier-reward-event/entities/tier-reward-event.entity";
import { TierRewardEventService } from "@src/ecom/tier-reward-event/tier-reward-event.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/tier-reward-events")
@ApiTags("Tier Reward Events")
@ApiBearerAuth()
@UseGuards(AdminGuard)
@UseInterceptors(ContextInterceptor)
export class TierRewardEventController {
    constructor(private readonly tierRewardEventService: TierRewardEventService) {}

    @Post()
    async create(
        @Body() createTierRewardEventDto: CreateTierRewardEventDto
    ): Promise<BaseCreatedResponse<TierRewardEvent>> {
        return await this.tierRewardEventService.createTierRewardEvent(createTierRewardEventDto);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateTierRewardEventDto: UpdateTierRewardEventDto
    ): Promise<BaseUpdatedResponse<TierRewardEvent>> {
        return await this.tierRewardEventService.update(+id, updateTierRewardEventDto);
    }

    @ApiExtraModels(TierRewardEvent)
    @ApiOkResponse({
        description: "The Tier Reward Event records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(TierRewardEvent),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: TierRewardEventFilter): Promise<BaseResponse<TierRewardEvent[]>> {
        return this.tierRewardEventService.findAll(request);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<TierRewardEvent> {
        return await this.tierRewardEventService.findOne(+id);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<BaseDeletedResponse> {
        return await this.tierRewardEventService.delete(+id);
    }
}
