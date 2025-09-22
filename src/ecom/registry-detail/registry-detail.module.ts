import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import User from "@src/app/users/entities/user.entity";
import { UserRepository } from "@src/app/users/users.repository";
import { ColorRepository } from "@src/ecom/color/color.repository";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import { ProductColor } from "@src/ecom/product-color/entities/product-color.entity";
import { ProductSize } from "@src/ecom/product-size/entities/product-size.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import Registry from "@src/ecom/registry/entities/registry.entity";
import { RegistryRepository } from "@src/ecom/registry/registry.repository";
import { SizeRepository } from "@src/ecom/size/size.repository";
import RegistryDetail from "./entities/registry-detail.entity";
import { RegistryDetailController } from "./registry-detail.controller";
import { RegistryDetailRepository } from "./registry-detail.repository";
import { RegistryDetailService } from "./registry-detail.service";

@Module({
    imports: [
        SequelizeModule.forFeature([User, Registry, RegistryDetail, Product, OrderDetail, ProductColor, ProductSize]),
    ],
    controllers: [RegistryDetailController],
    providers: [
        RegistryDetailService,
        RegistryDetailRepository,
        UserRepository,
        RegistryRepository,
        ProductRepository,
        OrderDetailRepository,
        ColorRepository,
        SizeRepository,
    ],
    exports: [RegistryDetailService],
})
export class RegistryDetailModule {}
