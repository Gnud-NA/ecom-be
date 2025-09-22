import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import PaymentCustomer from "@src/ecom/payment-customer/entities/payment-customer.entity";
import { PaymentCustomerRepository } from "@src/ecom/payment-customer/payment-customer.repository";
import { PaymentCustomerController } from "./payment-customer.controller";
import { PaymentCustomerService } from "./payment-customer.service";

@Module({
    imports: [SequelizeModule.forFeature([PaymentCustomer])],
    controllers: [PaymentCustomerController],
    providers: [PaymentCustomerService, PaymentCustomerRepository],
    exports: [PaymentCustomerService, PaymentCustomerRepository],
})
export class PaymentCustomerModule {}
