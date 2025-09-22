import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { HelperService } from "@src/app/helper/helper.service";
import { EmailTemplate } from "@src/app/helper/template.email";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import Order from "@src/ecom/order/entities/order.entity";
import { OrderRepository } from "@src/ecom/order/order.repository";
import { LoggerService } from "@src/logger/logger.service";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [SequelizeModule.forFeature([Order, OrderDetail])],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, OrderDetailRepository, HelperService, LoggerService, EmailTemplate],
    exports: [OrderService, OrderRepository],
})
export class OrderModule {}
