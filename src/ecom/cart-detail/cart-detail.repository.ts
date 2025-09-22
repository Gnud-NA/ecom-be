import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import CartDetail from "@src/ecom/cart-detail/entities/cart-detail.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CartDetailRepository extends BaseRepositorySequelize<CartDetail> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "CartDetail");
    }
}
