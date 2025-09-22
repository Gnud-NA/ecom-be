import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "wf_collections" })
export class Collection extends BaseModelSequelize<Collection> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.STRING(256) })
    name: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @ForeignKey(() => Collection)
    @Column({ field: "parent_id", type: DataType.INTEGER, allowNull: true })
    parentId: number;

    @BelongsTo(() => Collection, "parent_id")
    parent: Collection;

    @BelongsTo(() => User, "user_id")
    user: User;
}

// Autoload Model
export default Collection;
