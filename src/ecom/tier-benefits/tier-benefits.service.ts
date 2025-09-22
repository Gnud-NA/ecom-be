import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { TierBenefitFilter } from "@src/ecom/tier-benefits/dto/tier-benefits.dto";
import { UpdateTierBenefitDto } from "@src/ecom/tier-benefits/dto/update-tier-benefits.dto";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { plainToInstance } from "class-transformer";
import { CreateTierBenefitDto } from "./dto/create-tier-benefits.dto";
import TierBenefit from "./entities/tier-benefits.entity";
import { TierBenefitRepository } from "./tier-benefits.repository";

@Injectable()
export class TierBenefitService {
    constructor(private tierBenefitRepo: TierBenefitRepository, private tierRepo: TierRepository) {}

    async create(createTierBenefitDto: CreateTierBenefitDto): Promise<BaseCreatedResponse<TierBenefit>> {
        try {
            const tier = await this.tierRepo.findOne({ where: { id: createTierBenefitDto.tierId } });
            if (!tier) {
                throw new BadRequestException("Tier not found");
            }
            const newTierBenefit = await this.tierBenefitRepo.create(createTierBenefitDto);

            return {
                status: true,
                data: newTierBenefit,
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: TierBenefitFilter): Promise<BaseResponse<TierBenefit[]>> {
        const { count, data } = await this.tierBenefitRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        return { count, data: plainToInstance(TierBenefit, data) };
    }

    async findOne(id: number): Promise<TierBenefit> {
        const tierBenefit = await this.tierBenefitRepo.findOne({ where: { id } });
        if (!tierBenefit) {
            throw new BadRequestException("Tier Benefit not found");
        }
        return tierBenefit;
    }

    async update(id: number, updateTierBenefitDto: UpdateTierBenefitDto): Promise<BaseUpdatedResponse<TierBenefit>> {
        const tierBenefit = await this.tierBenefitRepo.findById(id);
        if (!tierBenefit) {
            throw new BadRequestException("Tier Benefit not found");
        }
        const newTierBenefitDto = plainToInstance(UpdateTierBenefitDto, updateTierBenefitDto, {
            excludeExtraneousValues: true,
        });

        await this.tierBenefitRepo.updateById(id, newTierBenefitDto);

        const result = await this.tierBenefitRepo.findOne({
            where: { id },
        });
        return {
            status: true,
            data: result,
        };
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        try {
            const tierBenefit = await this.tierBenefitRepo.findById(id);
            if (!tierBenefit) {
                throw new BadRequestException("Tier Benefit not found");
            }
            await this.tierBenefitRepo.delete(id);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}
