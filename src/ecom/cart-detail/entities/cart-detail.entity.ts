import { BaseModelSequelize } from "@src/base";
import Cart from "@src/ecom/cart/entities/cart.entity";
import Color from "@src/ecom/color/entities/color.entity";
import Product from "@src/ecom/product/entities/product.entity";
import Size from "@src/ecom/size/entities/size.entity";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_cart_details" })
export class CartDetail extends BaseModelSequelize<CartDetail> {
    @ForeignKey(() => Cart)
    @Column({ field: "cart_id", type: DataType.INTEGER })
    cartId: number;

    @ForeignKey(() => Color)
    @Column({ field: "color_id", type: DataType.INTEGER })
    colorId: number;

    @ForeignKey(() => Size)
    @Column({ field: "size_id", type: DataType.INTEGER })
    sizeId: number;

    @ForeignKey(() => Product)
    @Column({ field: "product_id", type: DataType.BIGINT })
    productId: number;

    @Column({ field: "quantity", type: DataType.NUMBER })
    quantity: number;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Cart)
    cart: Cart;

    @BelongsTo(() => Size)
    size: Size;

    @BelongsTo(() => Color)
    color: Color;
}

export default CartDetail;
