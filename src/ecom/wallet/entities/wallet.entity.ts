import { BaseModelSequelize } from "@src/base";
import { EcomWalletTypeEnum } from "@src/config";
import { Exclude, Expose } from "class-transformer";
import { Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_wallets",
})
export class Wallet extends BaseModelSequelize<Wallet> {
    @Expose()
    @Column({ field: "user_id", type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Expose()
    @Column({
        field: "type",
        type: DataType.ENUM(
            ...Object.keys(EcomWalletTypeEnum).map((key) => EcomWalletTypeEnum[key as keyof typeof EcomWalletTypeEnum])
        ),
        allowNull: false,
    })
    type: EcomWalletTypeEnum;

    @Expose()
    @Column({ field: "total_amount", type: DataType.DECIMAL(10, 2) })
    totalAmount: number;
}

// Autoload Model
export default Wallet;
