import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import ShippingMethod from "@src/ecom/shipping-method/entities/shipping-method.entity";
import { ShippingMethodRepository } from "@src/ecom/shipping-method/shipping-method.repository";
import { ShippingMethodController } from "./shipping-method.controller";
import { ShippingMethodService } from "./shipping-method.service";

@Module({
    imports: [SequelizeModule.forFeature([ShippingMethod])],
    controllers: [ShippingMethodController],
    providers: [ShippingMethodService, ShippingMethodRepository],
    exports: [ShippingMethodService, ShippingMethodRepository],
})
export class ShippingMethodModule {}
