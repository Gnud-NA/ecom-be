import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import PaymentCustomer from "@src/ecom/payment-customer/entities/payment-customer.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class PaymentCustomerRepository extends BaseRepositorySequelize<PaymentCustomer> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "PaymentCustomer");
    }
}
