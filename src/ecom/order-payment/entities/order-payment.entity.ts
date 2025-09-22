import { BaseModelSequelize } from "@src/base";
import { OrderPaymentMethodEnum } from "@src/config";
import Order from "@src/ecom/order/entities/order.entity";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_order_payments" })
export class OrderPayment extends BaseModelSequelize<OrderPayment> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Order)
    @Column({ field: "order_id", type: DataType.BIGINT })
    orderId: string;

    @Column({ field: "payment_method", type: DataType.STRING, defaultValue: OrderPaymentMethodEnum?.CREDIT_CARD })
    paymentMethod: OrderPaymentMethodEnum;

    @Column({ field: "metadata", type: DataType.TEXT })
    metadata: string;

    @Column({ field: "payment_status", type: DataType.TEXT })
    paymentStatus: string;

    @BelongsTo(() => Order, "order_id")
    order: Order;
}

export default OrderPayment;
