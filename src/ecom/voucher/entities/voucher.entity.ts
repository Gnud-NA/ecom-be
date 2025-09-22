import { BaseModelSequelize } from "@src/base";
import { VoucherTypeEnum } from "@src/config";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "ecom_vouchers" })
export class Voucher extends BaseModelSequelize<Voucher> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.STRING })
    name: string;

    @Column({ field: "code", type: DataType.STRING })
    code: string;

    @Column({ field: "type", type: DataType.STRING, defaultValue: VoucherTypeEnum.CASH })
    type: VoucherTypeEnum;

    @Column({ field: "amount", type: DataType.DECIMAL(15, 2), defaultValue: 0 })
    amount: string;

    @Column({ field: "status", type: DataType.BOOLEAN, defaultValue: true })
    status: boolean;
}

export default Voucher;
