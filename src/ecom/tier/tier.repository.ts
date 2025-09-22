import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class TierRepository extends BaseRepositorySequelize<Tier> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Tier");
    }
}
