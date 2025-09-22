import { BaseModelSequelize } from "@src/base";
import { ProductSize } from "@src/ecom/product-size/entities/product-size.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { BelongsToMany, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_sizes" })
export class Size extends BaseModelSequelize<Size> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.STRING })
    name: string;

    @Column({ field: "description", type: DataType.STRING })
    description: string;

    @Column({ field: "length", type: DataType.STRING })
    length: string;

    @Column({ field: "chest", type: DataType.STRING })
    chest: string;

    @BelongsToMany(() => Product, {
        through: () => ProductSize,
        foreignKey: "size_id",
        otherKey: "product_id",
        constraints: false,
    })
    products: Product[];
}

export default Size;
