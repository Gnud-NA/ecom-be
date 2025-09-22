import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class OrderDetailRepository extends BaseRepositorySequelize<OrderDetail> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "OrderDetail");
    }
}
