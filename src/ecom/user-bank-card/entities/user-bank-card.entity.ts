import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { Exclude, Expose } from "class-transformer";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_user_bank_cards",
})
export class UserBankCard extends BaseModelSequelize<UserBankCard> {
    @Expose()
    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @Expose()
    @Column({ field: "payment_method_id", type: DataType.STRING, allowNull: false })
    paymentMethodId: string;

    @Expose()
    @Column({ field: "brand", type: DataType.STRING, allowNull: false })
    brand: string;

    @Expose()
    @Column({ field: "last4", type: DataType.STRING, allowNull: false })
    last4: string;

    @Expose()
    @Column({ field: "exp_month", type: DataType.INTEGER, allowNull: false })
    expMonth: number;

    @Expose()
    @Column({ field: "exp_year", type: DataType.INTEGER, allowNull: false })
    expYear: number;

    @Expose()
    @Column({ field: "is_default", type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isDefault: boolean;

    @Expose()
    @BelongsTo(() => User, "user_id")
    user: User;
}

// Autoload Model
export default UserBankCard;
