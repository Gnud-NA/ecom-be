import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import TierBenefit from "@src/ecom/tier-benefits/entities/tier-benefits.entity";
import { TierBenefitRepository } from "@src/ecom/tier-benefits/tier-benefits.repository";
import Tier from "./entities/tier.entity";
import { TierController } from "./tier.controller";
import { TierRepository } from "./tier.repository";
import { TierService } from "./tier.service";

@Module({
    imports: [SequelizeModule.forFeature([Tier, TierBenefit])],
    controllers: [TierController],
    providers: [TierService, TierRepository, TierBenefitRepository],
    exports: [TierService],
})
export class TierModule {}
