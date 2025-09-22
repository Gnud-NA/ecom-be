import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { CreateTierDto } from "@src/ecom/tier/dto/create-tier.dto";
import { TierFilter } from "@src/ecom/tier/dto/tier.dto";
import { UpdateTierDto } from "@src/ecom/tier/dto/update-tier.dto";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { TierService } from "@src/ecom/tier/tier.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/tiers")
@ApiTags("Tiers")
@UseInterceptors(ContextInterceptor)
export class TierController {
    constructor(private readonly tierService: TierService) {}
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    async create(@Body() createTierDto: CreateTierDto): Promise<BaseCreatedResponse<Tier>> {
        return await this.tierService.createTier(createTierDto);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateTierDto: UpdateTierDto): Promise<BaseUpdatedResponse<Tier>> {
        return await this.tierService.update(+id, updateTierDto);
    }

    @ApiExtraModels(Tier)
    @ApiOkResponse({
        description: "The Tier records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(Tier),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: TierFilter): Promise<BaseResponse<Tier[]>> {
        return this.tierService.findAll(request);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Tier> {
        return await this.tierService.findOne(+id);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<BaseDeletedResponse> {
        return await this.tierService.delete(+id);
    }
}
