import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import { Product } from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { FavoritesController } from "./favorites.controller";
import { FavoritesRepository } from "./favorites.repository";
import { FavoritesService } from "./favorites.service";
@Module({
    imports: [SequelizeModule.forFeature([Favorites, Product])],
    controllers: [FavoritesController],
    providers: [FavoritesService, FavoritesRepository, ProductRepository],
    exports: [FavoritesService],
})
export class FavoritesModule {}
