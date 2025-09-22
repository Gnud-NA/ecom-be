import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import TierBenefit from "@src/ecom/tier-benefits/entities/tier-benefits.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class TierBenefitRepository extends BaseRepositorySequelize<TierBenefit> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "TierBenefit");
    }
}
