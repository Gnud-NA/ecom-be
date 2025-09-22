// user-role.model.ts (để định nghĩa bảng nối)
import Role from "@src/app/role/entities/role.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "wf_user_roles" })
export class UserRole extends BaseModelSequelize<UserRole> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "user_id" })
    @ForeignKey(() => User)
    userId: number;

    @Column({ field: "role_id" })
    @ForeignKey(() => Role)
    roleId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => Role, "role_id")
    role: Role;
}
