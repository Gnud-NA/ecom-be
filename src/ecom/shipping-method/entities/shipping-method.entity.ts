import { BaseModelSequelize } from "@src/base";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_shipping_methods" })
export class ShippingMethod extends BaseModelSequelize<ShippingMethod> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "code", type: DataType.STRING })
    code: string;

    @Column({ field: "name", type: DataType.STRING })
    name: string;

    @Column({ field: "note", type: DataType.TEXT })
    note: string;

    @Column({ field: "amount", type: DataType.DECIMAL(10, 2) })
    amount: number;

    @Column({ field: "is_default", type: DataType.BOOLEAN, defaultValue: false })
    isDefault: boolean;

    @Column({ field: "is_free", type: DataType.BOOLEAN, defaultValue: false })
    isFree: boolean;
}

export default ShippingMethod;
