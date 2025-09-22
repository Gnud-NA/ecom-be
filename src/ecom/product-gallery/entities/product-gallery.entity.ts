// post-color.model.ts (để định nghĩa bảng nối)
import Media from "@src/app/media/entities/media.entity";
import { BaseModelSequelize } from "@src/base";
import Color from "@src/ecom/color/entities/color.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_product_galleries" })
export class ProductGallery extends BaseModelSequelize<ProductGallery> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "code", type: DataType.STRING })
    code: string;

    @Column({ field: "ecom_product_id" })
    @ForeignKey(() => Product)
    productId: number;

    @Column({ field: "ecom_color_id" })
    @ForeignKey(() => Color)
    colorId: number;

    @Column({ field: "media_id" })
    @ForeignKey(() => Media)
    mediaId: number;

    @Column({ field: "url", type: DataType.STRING })
    url: string;

    @BelongsTo(() => Product, "ecom_product_id")
    product: Product;

    @BelongsTo(() => Color, "ecom_color_id")
    color: Color;

    @BelongsTo(() => Media, "media_id")
    media: Media;
}
