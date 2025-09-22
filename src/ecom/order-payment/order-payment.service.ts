import { Inject, Injectable } from "@nestjs/common";
import { BaseService } from "@src/base";
import OrderPayment from "@src/ecom/order-payment/entities/order-payment.entity";
import { OrderPaymentRepository } from "@src/ecom/order-payment/order-payment.repository";

import { Sequelize } from "sequelize-typescript";

@Injectable()
export class OrderPaymentService extends BaseService<OrderPayment, OrderPaymentRepository> {
    constructor(
        @Inject(OrderPaymentRepository)
        private readonly orderPaymentRepository: OrderPaymentRepository,
        private sequelize: Sequelize
    ) {
        super(orderPaymentRepository);
    }
}
