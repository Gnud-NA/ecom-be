import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import TierBenefit from "./entities/tier-benefits.entity";
import { TierBenefitController } from "./tier-benefits.controller";
import { TierBenefitRepository } from "./tier-benefits.repository";
import { TierBenefitService } from "./tier-benefits.service";

@Module({
    imports: [SequelizeModule.forFeature([TierBenefit, Tier])],
    controllers: [TierBenefitController],
    providers: [TierBenefitService, TierBenefitRepository, TierRepository],
    exports: [TierBenefitService],
})
export class TierBenefitModule {}
