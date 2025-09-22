import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import {
    OrderPaymentMethodEnum,
    OrderPaymentStatusEnum,
    OrderShippingStatusEnum,
    OrderStatusEnum,
    QuantityUnit,
    ShippingMethodEnum,
} from "@src/config";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import OrderPayment from "@src/ecom/order-payment/entities/order-payment.entity";
import { BelongsTo, Column, DataType, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_orders" })
export class Order extends BaseModelSequelize<Order> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "address", type: DataType.TEXT })
    address: string;

    @Column({ field: "code", type: DataType.STRING })
    code: string;

    @Column({ field: "promotion_code", type: DataType.STRING })
    promotionCode: string;

    @Column({ field: "promotion_amount", type: DataType.DECIMAL(15, 2) })
    promotionAmount: number;

    @Column({ field: "status", type: DataType.BOOLEAN })
    status: boolean;

    @Column({ field: "order_status", type: DataType.STRING, defaultValue: OrderStatusEnum.ACTIVATION })
    orderStatus: OrderStatusEnum;

    @Column({ field: "payment_status", type: DataType.STRING, defaultValue: OrderPaymentStatusEnum.PENDING })
    paymentStatus: OrderPaymentStatusEnum;

    @Column({ field: "payment_method", type: DataType.STRING, defaultValue: OrderPaymentMethodEnum.CREDIT_CARD })
    paymentMethod: OrderPaymentMethodEnum;

    @Column({ field: "shipping_status", type: DataType.STRING, defaultValue: OrderShippingStatusEnum.NONE })
    shippingStatus: OrderShippingStatusEnum;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "note", type: DataType.TEXT })
    note: string;

    @Column({ field: "total_quantity", type: DataType.DECIMAL(10, 2) })
    totalQuantity: number;

    @Column({ field: "quantity_unit", type: DataType.STRING, defaultValue: QuantityUnit.PIECE })
    quantityUnit: QuantityUnit;

    @Column({ field: "total_amount", type: DataType.DECIMAL(10, 2) })
    totalAmount: number;

    @Column({ field: "shipping_amount", type: DataType.DECIMAL(10, 2) })
    shippingAmount: number;

    @Column({ field: "tax_amount", type: DataType.DECIMAL(10, 2) })
    taxAmount: number;

    @Column({ field: "taxes", type: DataType.DECIMAL(10, 2) })
    taxes: number;

    @Column({ field: "first_name", type: DataType.STRING })
    firstName: number;

    @Column({ field: "last_name", type: DataType.STRING })
    lastName: number;

    @Column({ field: "email", type: DataType.STRING, allowNull: true })
    email: string;

    @Column({ field: "phone", type: DataType.STRING, allowNull: true })
    phone: string;

    @Column({ field: "apartment", type: DataType.STRING, allowNull: true })
    apartment: string;

    @Column({ field: "security_code", type: DataType.STRING, allowNull: true })
    securityCode: string;

    @Column({ field: "city", type: DataType.STRING, allowNull: true })
    city: string;

    @Column({ field: "state", type: DataType.STRING, allowNull: true })
    state: string;

    @Column({ field: "country", type: DataType.STRING, allowNull: true })
    country: string;

    @Column({ field: "post_code", type: DataType.STRING, allowNull: true })
    postCode: string;

    @Column({ field: "shipping_method", type: DataType.STRING, allowNull: true })
    shippingMethod: ShippingMethodEnum;

    @Column({ field: "shipping_to_address", type: DataType.STRING, allowNull: true })
    shippingToAddress: string;

    @Column({ field: "shipping_to_first_name", type: DataType.STRING, allowNull: true })
    shippingToFirstName: string;

    @Column({ field: "shipping_to_last_name", type: DataType.STRING, allowNull: true })
    shippingToLastName: string;

    @Column({ field: "shipping_to_email", type: DataType.STRING, allowNull: true })
    shippingToEmail: string;

    @Column({ field: "shipping_to_phone", type: DataType.STRING, allowNull: true })
    shippingToPhone: string;

    @Column({ field: "shipping_to_apartment", type: DataType.STRING, allowNull: true })
    shippingToApartment: string;

    @Column({ field: "shipping_to_security_code", type: DataType.STRING, allowNull: true })
    shippingToSecurityCode: string;

    @Column({ field: "shipping_to_city", type: DataType.STRING, allowNull: true })
    shippingToCity: string;

    @Column({ field: "shipping_to_state", type: DataType.STRING, allowNull: true })
    shippingToState: string;

    @Column({ field: "shipping_to_country", type: DataType.STRING, allowNull: true })
    shippingToCountry: string;

    @Column({ field: "shipping_to_post_code", type: DataType.STRING, allowNull: true })
    shippingToPostCode: string;

    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => User, "employee_id")
    employee: User;

    @HasMany(() => OrderDetail, {
        foreignKey: "order_id",
    })
    orderDetails: OrderDetail[];

    @HasMany(() => OrderPayment, {
        foreignKey: "order_id",
    })
    orderPayments: OrderPayment[];
}

export default Order;
