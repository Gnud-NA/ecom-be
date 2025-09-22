import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import RegistryEvent from "@src/ecom/registry-event/entities/registry-event.entity";
import { Exclude, Expose, Type } from "class-transformer";
import { BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({
    tableName: "ecom_registries",
})
export class Registry extends BaseModelSequelize<Registry> {
    @Expose()
    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT, allowNull: false })
    @Type(() => Number)
    userId: number;

    @Expose()
    @ForeignKey(() => RegistryEvent)
    @Column({ field: "registry_event_id", type: DataType.BIGINT, allowNull: false })
    @Type(() => Number)
    registryEventId: number;

    @Expose()
    @Column({ field: "first_name", type: DataType.STRING })
    firstName: string;

    @Expose()
    @Column({ field: "last_name", type: DataType.STRING })
    lastName: string;

    @Expose()
    @Column({
        type: "timestamptz",
        field: "event_date",
        allowNull: true,
    })
    eventDate: Date;

    @Expose()
    @Column({ field: "description", type: DataType.STRING, allowNull: true })
    description: string;

    @Expose()
    @Column({ field: "recipient_first_name", type: DataType.STRING, allowNull: true })
    recipientFirstName: string;

    @Expose()
    @Column({ field: "recipient_last_name", type: DataType.STRING, allowNull: true })
    recipientLastName: string;

    @Expose()
    @Column({ type: DataType.STRING(128), unique: false })
    phone: string;

    @Expose()
    @Column({ field: "country_calling_code", type: DataType.STRING(128), unique: false })
    countryCallingCode: string;

    @Expose()
    @Column({ field: "address_line1", type: DataType.STRING(255), allowNull: true })
    addressLine1: string;

    @Expose()
    @Column({ field: "address_line2", type: DataType.STRING(255), allowNull: true })
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

    @Column({ field: "door_code", type: DataType.STRING, allowNull: true })
    doorCode: string;

    @Expose()
    @Column({ field: "is_private", type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isPrivate: boolean;

    @Exclude()
    @Column({ field: "pin_code", type: DataType.STRING, allowNull: true })
    pinCode: string;

    @Expose()
    @Column({ field: "question_name", type: DataType.STRING, allowNull: true })
    questionName: string;

    @Expose()
    @Column({ field: "question_message", type: DataType.STRING, allowNull: true })
    questionMessage: string;

    @Expose()
    @Column({ field: "is_receive_egift_card", type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    isReceiveEgiftCard: boolean;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => RegistryEvent, {
        foreignKey: "registry_event_id",
        targetKey: "id",
    })
    registryEvent: RegistryEvent;

    @Column({ field: "full_name", type: DataType.STRING, allowNull: true })
    fullName: string;

    @BeforeCreate
    @BeforeUpdate
    static setFullName(instance: Registry) {
        if (instance.firstName || instance.lastName) {
            instance.fullName = `${instance.firstName ?? ""} ${instance.lastName ?? ""}`.trim();
        }
    }
}

// Autoload Model
export default Registry;
