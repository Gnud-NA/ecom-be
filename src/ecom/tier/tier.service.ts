import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseCreatedResponse, BaseDeletedResponse, BaseResponse, BaseService, BaseUpdatedResponse } from "@src/base";
import TierBenefit from "@src/ecom/tier-benefits/entities/tier-benefits.entity";
import { TierBenefitRepository } from "@src/ecom/tier-benefits/tier-benefits.repository";
import { TierFilter } from "@src/ecom/tier/dto/tier.dto";
import { UpdateTierDto } from "@src/ecom/tier/dto/update-tier.dto";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils/common.util";
import { Sequelize } from "sequelize-typescript";
import { CreateTierDto } from "./dto/create-tier.dto";
import Tier from "./entities/tier.entity";
import { TierRepository } from "./tier.repository";

@Injectable()
export class TierService extends BaseService<Tier, TierRepository> {
    constructor(
        private tierRepo: TierRepository,
        private tierBenefitRepo: TierBenefitRepository,
        private sequelize: Sequelize
    ) {
        super(tierRepo);
    }

    async createTier(createTierDto: CreateTierDto): Promise<BaseCreatedResponse<Tier>> {
        try {
            const newTier = await this.tierRepo.create(createTierDto);
            return {
                status: true,
                data: newTier,
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter?: TierFilter): Promise<BaseResponse<Tier[]>> {
        const { count, data } = await this.tierRepo.findAndCount({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
            include: [
                {
                    model: TierBenefit,
                    as: "tierBenefits",
                    order: [["priority", "ASC"]],
                },
            ],
        });

        return { count, data: data };
    }

    async findOne(id: number): Promise<Tier> {
        const tier = await this.tierRepo.findOne({ where: { id } });
        if (!tier) {
            throw new BadRequestException("Tier not found");
        }
        return tier;
    }

    async update(id: number, updateTierDto: UpdateTierDto): Promise<BaseUpdatedResponse<Tier>> {
        const tier = await this.tierRepo.findById(id);
        if (!tier) {
            throw new BadRequestException("Tier not found");
        }
        await tier.update({ ...tier, ...updateTierDto });
        return {
            status: true,
            data: tier,
        };
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        try {
            const tier = await this.tierRepo.findOne({ where: { id } });

            console.log("tier", tier);
            if (!tier) {
                throw new BadRequestException("Tier not found");
            }
            const result = await this.sequelize.transaction(async (t) => {
                const tier = await this.tierRepo.findById(id);
                if (!tier) {
                    throw new BadRequestException("Tier not found");
                }
                await this.tierRepo.delete(id, t);
                await this.tierBenefitRepo.deleteWidthCondition({
                    deleteWidthCondition: {
                        tierId: id,
                    },
                    transaction: t,
                });

                return true;
            });
            return { status: result };
        } catch (error) {
            throw error;
        }
    }
}
