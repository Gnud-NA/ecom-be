import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { CreateTierBenefitDto } from "@src/ecom/tier-benefits/dto/create-tier-benefits.dto";
import { TierBenefitFilter } from "@src/ecom/tier-benefits/dto/tier-benefits.dto";
import { UpdateTierBenefitDto } from "@src/ecom/tier-benefits/dto/update-tier-benefits.dto";
import TierBenefit from "@src/ecom/tier-benefits/entities/tier-benefits.entity";
import { TierBenefitService } from "@src/ecom/tier-benefits/tier-benefits.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/tier-benefits")
@ApiTags("Tier Benefits")
@ApiBearerAuth()
@UseGuards(AdminGuard)
@UseInterceptors(ContextInterceptor)
export class TierBenefitController {
    constructor(private readonly tierBenefitService: TierBenefitService) {}

    @Post()
    async create(@Body() createTierBenefitDto: CreateTierBenefitDto): Promise<BaseCreatedResponse<TierBenefit>> {
        return await this.tierBenefitService.create(createTierBenefitDto);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateTierBenefitDto: UpdateTierBenefitDto
    ): Promise<BaseUpdatedResponse<TierBenefit>> {
        return await this.tierBenefitService.update(+id, updateTierBenefitDto);
    }

    @ApiExtraModels(TierBenefit)
    @ApiOkResponse({
        description: "The Tier Benefit records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(TierBenefit),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: TierBenefitFilter): Promise<BaseResponse<TierBenefit[]>> {
        return this.tierBenefitService.findAll(request);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<TierBenefit> {
        return await this.tierBenefitService.findOne(+id);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<BaseDeletedResponse> {
        return await this.tierBenefitService.delete(+id);
    }
}
