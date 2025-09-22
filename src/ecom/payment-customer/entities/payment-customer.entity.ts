import { BaseModelSequelize } from "@src/base";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_payment_customers" })
export class PaymentCustomer extends BaseModelSequelize<PaymentCustomer> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        field: "customer_id",
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    customerId: string;

    @Column({
        field: "object",
        type: DataType.STRING,
        allowNull: false,
    })
    object: string;

    @Column({
        field: "address",
        type: DataType.TEXT,
        allowNull: true,
    })
    address: string;

    @Column({
        field: "created",
        type: DataType.INTEGER,
        allowNull: false,
    })
    created: number;

    @Column({
        field: "currency",
        type: DataType.STRING,
        allowNull: true,
    })
    currency: string;

    @Column({
        field: "delinquent",
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    delinquent: boolean;

    @Column({
        field: "description",
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        field: "email",
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        field: "livemode",
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    livemode: boolean;

    @Column({
        field: "metadata",
        type: DataType.JSON,
        allowNull: true,
    })
    metadata: object;

    @Column({
        field: "name",
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;

    @Column({
        field: "next_invoice_sequence",
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1,
    })
    nextInvoiceSequence: number;

    @Column({
        field: "phone",
        type: DataType.STRING,
        allowNull: true,
    })
    phone: string;

    @Column({
        field: "preferred_locales",
        type: DataType.TEXT,
        allowNull: true,
    })
    preferredLocales: string;

    @Column({
        field: "tax_exempt",
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "none",
    })
    taxExempt: string;

    @Column({
        field: "test_clock",
        type: DataType.STRING,
        allowNull: true,
    })
    testClock: string;
}

export default PaymentCustomer;
