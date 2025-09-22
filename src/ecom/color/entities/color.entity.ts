import { BaseModelSequelize } from "@src/base";
import { ProductColor } from "@src/ecom/product-color/entities/product-color.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { BelongsToMany, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_colors" })
export class Color extends BaseModelSequelize<Color> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.STRING })
    name: string;

    @Column({ field: "hex_code", type: DataType.STRING })
    hexCode: string;

    @BelongsToMany(() => Product, {
        through: () => ProductColor,
        foreignKey: "ecom_color_id",
        otherKey: "ecom_product_id",
        constraints: false,
    })
    products: Product[];
}

export default Color;
