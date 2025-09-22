import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MediaRepository } from "@src/app/media/media.repository";
import { ProductGalleryRepository } from "@src/ecom/product-gallery/product-gallery.repository";
import Product from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository, MediaRepository, ProductGalleryRepository],
})
export class ProductModule {}
