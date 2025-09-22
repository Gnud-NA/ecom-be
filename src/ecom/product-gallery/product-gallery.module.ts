import { Module } from "@nestjs/common";
import { ProductGalleryRepository } from "@src/ecom/product-gallery/product-gallery.repository";
import { ProductGalleryController } from "./product-gallery.controller";
import { ProductGalleryService } from "./product-gallery.service";

@Module({
    controllers: [ProductGalleryController],
    providers: [ProductGalleryService, ProductGalleryRepository],
})
export class ProductGalleryModule {}
