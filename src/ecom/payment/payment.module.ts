import { Logger, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { HelperService } from "@src/app/helper/helper.service";
import { EmailTemplate } from "@src/app/helper/template.email";
import User from "@src/app/users/entities/user.entity";
import { UserRepository } from "@src/app/users/users.repository";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import { OrderPaymentRepository } from "@src/ecom/order-payment/order-payment.repository";
import { OrderRepository } from "@src/ecom/order/order.repository";
import { OrderService } from "@src/ecom/order/order.service";
import PaymentCustomer from "@src/ecom/payment-customer/entities/payment-customer.entity";
import { PaymentCustomerRepository } from "@src/ecom/payment-customer/payment-customer.repository";
import { PaymentCustomerService } from "@src/ecom/payment-customer/payment-customer.service";
import { PaymentsController } from "@src/ecom/payment/payment.controller";
import { ShippingService } from "@src/ecom/payment/shipping.service";
import { StripeService } from "@src/ecom/payment/stripe.service";
import UserBankCard from "@src/ecom/user-bank-card/entities/user-bank-card.entity";
import { LoggerService } from "@src/logger/logger.service";

@Module({
    imports: [SequelizeModule.forFeature([PaymentCustomer, User, UserBankCard])],
    controllers: [PaymentsController],
    providers: [
        StripeService,
        PaymentCustomerService,
        PaymentCustomerRepository,
        ShippingService,
        OrderPaymentRepository,
        HelperService,
        OrderService,
        OrderRepository,
        Logger,
        LoggerService,
        OrderDetailRepository,
        EmailTemplate,
        UserRepository,
    ],
    exports: [StripeService],
})
export class PaymentModule {}
