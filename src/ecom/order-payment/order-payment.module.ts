import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import OrderPayment from "@src/ecom/order-payment/entities/order-payment.entity";
import { OrderPaymentController } from "@src/ecom/order-payment/order-payment.controller";
import { OrderPaymentRepository } from "@src/ecom/order-payment/order-payment.repository";
import { OrderPaymentService } from "@src/ecom/order-payment/order-payment.service";

@Module({
    imports: [SequelizeModule.forFeature([OrderPayment])],
    controllers: [OrderPaymentController],
    providers: [OrderPaymentService, OrderPaymentRepository],
    exports: [OrderPaymentService, OrderPaymentRepository],
})
export class OrderPaymentModule {}
