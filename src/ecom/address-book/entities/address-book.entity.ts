import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { Exclude, Expose } from "class-transformer";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "ecom_address_books",
})
export class AddressBook extends BaseModelSequelize<AddressBook> {
    @Expose()
    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @Expose()
    @Column({ field: "name", type: DataType.STRING, allowNull: true })
    name: string;

    @Expose()
    @Column({ type: DataType.STRING(128), unique: false })
    phone: string;

    @Expose()
    @Column({ field: "address_line1", type: DataType.STRING, allowNull: true })
    addressLine1: string;

    @Expose()
    @Column({ field: "address_line2", type: DataType.STRING, allowNull: true })
    addressLine2: string;

    @Expose()
    @Column({ field: "street", type: DataType.STRING, allowNull: true })
    street: string;

    @Expose()
    @Column({ field: "city", type: DataType.STRING, allowNull: true })
    city: string;

    @Expose()
    @Column({ field: "country", type: DataType.STRING, allowNull: true })
    country: string;

    @Expose()
    @Column({ field: "state", type: DataType.STRING, allowNull: true })
    state: string;

    @Expose()
    @Column({ field: "zipcode", type: DataType.STRING, allowNull: true })
    zipcode: string;

    @Expose()
    @Column({ field: "door_code", type: DataType.STRING, allowNull: true })
    doorCode: string;

    @Expose()
    @Column({ field: "is_default", type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isDefault: boolean;

    @Expose()
    @Column({ field: "is_billing", type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isBilling: boolean;

    @Expose()
    @Column({ field: "is_delivery", type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isDelivery: boolean;

    @Expose()
    @BelongsTo(() => User, "user_id")
    user: User;
}

// Autoload Model
export default AddressBook;
