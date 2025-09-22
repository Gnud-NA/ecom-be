import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Order from "@src/ecom/order/entities/order.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class OrderRepository extends BaseRepositorySequelize<Order> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Order");
    }
}
