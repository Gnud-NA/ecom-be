import { BaseModelSequelize } from "@src/base";
import { WalletTransactionEventTypeEnum, WalletTransactionSourceEnum, WalletTransactionTypeEnum } from "@src/config";
import { Exclude, Expose } from "class-transformer";
import { Column, DataType, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_wallet_transactions",
})
export class WalletTransaction extends BaseModelSequelize<WalletTransaction> {
    @Expose()
    @Column({ field: "wallet_id", type: DataType.INTEGER, allowNull: false })
    walletId: number;

    @Expose()
    @Column({
        field: "source_id",
        type: DataType.INTEGER,
        allowNull: true,
    })
    sourceId: number;

    @Expose()
    @Column({
        field: "source",
        type: DataType.ENUM(
            ...Object.keys(WalletTransactionSourceEnum).map(
                (key) => WalletTransactionSourceEnum[key as keyof typeof WalletTransactionSourceEnum]
            )
        ),
        allowNull: true,
    })
    source: WalletTransactionSourceEnum;

    @Expose()
    @Column({ field: "user_id", type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Expose()
    @Column({ field: "amount", type: DataType.DECIMAL(10, 2), allowNull: false })
    amount: number;

    @Expose()
    @Column({
        field: "type",
        type: DataType.ENUM(
            ...Object.keys(WalletTransactionTypeEnum).map(
                (key) => WalletTransactionTypeEnum[key as keyof typeof WalletTransactionTypeEnum]
            )
        ),
        allowNull: false,
    })
    type: WalletTransactionTypeEnum;

    @Expose()
    @Column({
        field: "event_type",
        type: DataType.ENUM(
            ...Object.keys(WalletTransactionEventTypeEnum).map(
                (key) => WalletTransactionEventTypeEnum[key as keyof typeof WalletTransactionEventTypeEnum]
            )
        ),
        allowNull: true,
    })
    eventType: WalletTransactionEventTypeEnum;
}

// Autoload Model
export default WalletTransaction;
