import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Cart from "@src/ecom/cart/entities/cart.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CartRepository extends BaseRepositorySequelize<Cart> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Cart");
    }
}
