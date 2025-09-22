import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import { OrderDetailController } from "./order-detail.controller";
import { OrderDetailService } from "./order-detail.service";

@Module({
    imports: [SequelizeModule.forFeature([OrderDetail])],
    controllers: [OrderDetailController],
    providers: [OrderDetailService, OrderDetailRepository],
    exports: [OrderDetailService, OrderDetailRepository],
})
export class OrderDetailModule {}
