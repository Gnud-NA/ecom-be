import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "wf_roles" })
export class Role extends BaseModelSequelize<Role> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING(256), unique: true, allowNull: true })
    name?: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @Column({ field: "status", type: DataType.BOOLEAN })
    status: boolean;
}

// Autoload Model
export default Role;
