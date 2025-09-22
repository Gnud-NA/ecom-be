import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import OrderPayment from "@src/ecom/order-payment/entities/order-payment.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class OrderPaymentRepository extends BaseRepositorySequelize<OrderPayment> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "OrderPayment");
    }
}
