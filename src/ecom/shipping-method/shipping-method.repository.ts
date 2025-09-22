import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import ShippingMethod from "@src/ecom/shipping-method/entities/shipping-method.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ShippingMethodRepository extends BaseRepositorySequelize<ShippingMethod> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "ShippingMethod");
    }
}
