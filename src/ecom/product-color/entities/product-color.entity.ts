// post-color.model.ts (để định nghĩa bảng nối)
import { BaseModelSequelize } from "@src/base";
import Color from "@src/ecom/color/entities/color.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_product_colors" })
export class ProductColor extends BaseModelSequelize<ProductColor> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        field: "ecom_product_id",
        references: {
            model: "Product",
            key: "id",
        },
    })
    @ForeignKey(() => Product)
    productId: number;

    @Column({
        field: "ecom_color_id",
        references: {
            model: "Color",
            key: "id",
        },
    })
    @ForeignKey(() => Color)
    colorId: number;

    @BelongsTo(() => Product, "ecom_product_id")
    product: Product;

    @BelongsTo(() => Color, "ecom_color_id")
    color: Color;
}
