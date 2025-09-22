// post-category.model.ts (để định nghĩa bảng nối)
import { BaseModelSequelize } from "@src/base";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_product_categories" })
export class ProductCategory extends BaseModelSequelize<ProductCategory> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "ecom_product_id" })
    @ForeignKey(() => Product)
    productId: number;

    @Column({ field: "ecom_category_id" })
    @ForeignKey(() => EcomCategory)
    categoryId: number;

    @BelongsTo(() => Product, "ecom_product_id")
    product: Product;

    @BelongsTo(() => EcomCategory, "ecom_category_id")
    category: EcomCategory;
}
