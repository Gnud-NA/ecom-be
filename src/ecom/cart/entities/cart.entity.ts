import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import CartDetail from "@src/ecom/cart-detail/entities/cart-detail.entity";
import { Column, DataType, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_carts" })
class Cart extends BaseModelSequelize<Cart> {
    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @Column({ field: "total_quantity", type: DataType.NUMBER })
    totalQuantity: number;

    @Column({ field: "gift_code", type: DataType.STRING })
    giftCode: string;

    @Column({ field: "note", type: DataType.STRING })
    note: string;

    @HasMany(() => CartDetail, "cart_id")
    cartDetails: CartDetail[];

    @HasOne(() => User, "id")
    user: User;
}

export default Cart;
