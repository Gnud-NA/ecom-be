import { BaseModelSequelize } from "@src/base";
import Order from "@src/ecom/order/entities/order.entity";
import Product from "@src/ecom/product/entities/product.entity";
import Registry from "@src/ecom/registry/entities/registry.entity";
import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_order_details" })
export class OrderDetail extends BaseModelSequelize<OrderDetail> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "color", type: DataType.STRING })
    color: string;

    @Column({ field: "size", type: DataType.STRING })
    size: string;

    @Column({ field: "price", type: DataType.DECIMAL(15, 2) })
    price: number;

    @Column({ field: "quantity", type: DataType.DECIMAL(15, 2) })
    quantity: number;

    @Column({ field: "order_id", type: DataType.BIGINT })
    orderId: number;

    @Column({ field: "product_id", type: DataType.DECIMAL(15, 2) })
    productId: number;

    @Column({ field: "registry_id", type: DataType.DECIMAL(15, 2) })
    registryId: number;

    @BelongsTo(() => Product, "product_id")
    product: Product;

    @BelongsTo(() => Order, "order_id")
    order: Order;

    @BelongsTo(() => Registry, "registry_id")
    registry: Registry;
}

export default OrderDetail;
