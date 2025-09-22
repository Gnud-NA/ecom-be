import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CartDetailRepository } from "@src/ecom/cart-detail/cart-detail.repository";
import { CartController } from "@src/ecom/cart/cart.controller";
import { CartRepository } from "@src/ecom/cart/cart.repository";
import { CartService } from "@src/ecom/cart/cart.service";
import Cart from "@src/ecom/cart/entities/cart.entity";

@Module({
    imports: [SequelizeModule.forFeature([Cart])],
    controllers: [CartController],
    providers: [CartService, CartRepository, CartDetailRepository],
    exports: [CartService, CartRepository],
})
export class CartModule {}
