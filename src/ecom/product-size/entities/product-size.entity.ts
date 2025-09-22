// post-size.model.ts (để định nghĩa bảng nối)
import { BaseModelSequelize } from "@src/base";
import Product from "@src/ecom/product/entities/product.entity";
import Size from "@src/ecom/size/entities/size.entity";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_product_sizes" })
export class ProductSize extends BaseModelSequelize<ProductSize> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        field: "product_id",
        references: {
            model: "Product",
            key: "id",
        },
    })
    @ForeignKey(() => Product)
    productId: number;

    @Column({
        field: "size_id",
        references: {
            model: "Size",
            key: "id",
        },
    })
    @ForeignKey(() => Size)
    sizeId: number;

    @BelongsTo(() => Product, "product_id")
    product: Product;

    @BelongsTo(() => Size, "size_id")
    size: Size;
}
