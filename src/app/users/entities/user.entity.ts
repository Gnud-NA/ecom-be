import { ApiProperty } from "@nestjs/swagger";
import Category from "@src/app/categories/entities/category.entity";
import Role from "@src/app/role/entities/role.entity";
import { UserRole } from "@src/app/user-role/entities/user-role.entity";
import { UserObserver } from "@src/app/users/entities/user.observer";
import { BaseModelSequelize } from "@src/base";
import Cart from "@src/ecom/cart/entities/cart.entity";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import Tier from "@src/ecom/tier/entities/tier.entity";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, Min } from "class-validator";
import { BelongsTo, BelongsToMany, Column, DataType, HasMany, HasOne, Table } from "sequelize-typescript";

@Exclude()
@Table({
    tableName: "wf_users",
    hooks: {
        ...UserObserver,
    },
})
export class User extends BaseModelSequelize<User> {
    @Column({ type: DataType.STRING(128), unique: false })
    @IsEmail()
    email: string;

    @Column({ type: DataType.STRING(128), unique: false })
    phone: string;

    @Column({ field: "country_calling_code", type: DataType.STRING(128), unique: false })
    countryCallingCode: string;

    @Column({ field: "phone_number", type: DataType.STRING(128), unique: false })
    phoneNumber: string;

    @Column({ type: DataType.STRING(256), unique: true, allowNull: true })
    username?: string;

    @Exclude()
    @Min(10)
    @Column({ type: DataType.STRING(128) })
    password: string;

    @Column({
        type: "timestamptz",
        field: "date_of_birth",
        allowNull: true,
    })
    @ApiProperty()
    dateOfBirth: Date;

    @Column({
        type: DataType.STRING(128),
        field: "first_name",
        allowNull: true,
    })
    firstName: string;

    @Column({
        type: DataType.STRING(128),
        field: "last_name",
        allowNull: true,
    })
    lastName: string;

    @Column({ type: "boolean", defaultValue: false, field: "is_verify" })
    isVerify: Boolean;

    @Column({ type: "boolean", defaultValue: null, field: "verify_code" })
    verifyCode: string;

    @Column({ type: "string", defaultValue: null, field: "send_code_at" })
    sendCodeAt: string;

    @Column({ type: "string", defaultValue: null, field: "remember_token" })
    rememberToken: string;

    @Column({ type: "string", defaultValue: null, field: "payment_customer_id" })
    paymentCustomerId: string;

    @Column({ type: "integer", defaultValue: null, field: "tier_id" })
    tierId: number;

    @Column({ type: "boolean", defaultValue: true, field: "membership_active" })
    membershipActive: boolean;

    @Column({ type: "string", defaultValue: null, field: "reason_membership_lock" })
    reasonMembershipLock: string;

    @Expose()
    get fullName(): string {
        const first = this.firstName ?? "";
        const last = this.lastName ?? "";
        console.log(first, last);
        const fullName = `${first} ${last}`.trim();
        return fullName || null;
    }

    @HasMany(() => Category, {
        as: "categories",
        foreignKey: "user_id",
    })
    categories: number;

    // @BelongsToMany(() => Role, {
    //     through: () => UserRole,
    //     as: "roles",
    //     foreignKey: "user_id",
    //     otherKey: "role_id",
    // })
    // roles: Role;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    constructor(values?: object, options?: any) {
        super({ ...values }, options);
    }

    @HasOne(() => Cart, "user_id")
    cart: Cart;

    @HasMany(() => Favorites, "user_id")
    favorites: Favorites[];

    @BelongsTo(() => Tier, {
        as: "tier",
        foreignKey: "tierId",
        targetKey: "id",
    })
    tier: Tier;
}

// Autoload Model
export default User;
