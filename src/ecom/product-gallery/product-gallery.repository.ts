import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { ProductGallery } from "@src/ecom/product-gallery/entities/product-gallery.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ProductGalleryRepository extends BaseRepositorySequelize<ProductGallery> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "ProductGallery");
    }
}
