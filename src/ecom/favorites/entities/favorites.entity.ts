import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import Product from "@src/ecom/product/entities/product.entity";
import { Exclude } from "class-transformer";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_favorites",
})
export class Favorites extends BaseModelSequelize<Favorites> {
    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @ForeignKey(() => Product)
    @Column({ field: "product_id", type: DataType.BIGINT })
    productId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => Product, "product_id")
    product: Product;
}

// Autoload Model
export default Favorites;
