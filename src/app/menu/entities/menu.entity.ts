import MenuDetail from "@src/app/menu-detail/entities/menu-detail.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsTo, Column, DataType, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "wf_menus" })
export class Menu extends BaseModelSequelize<Menu> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.TEXT })
    name: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "wf_code", type: DataType.STRING(256) })
    wfCode: string;

    @Column({ field: "is_primary", type: DataType.BOOLEAN })
    isPrimary: boolean;

    @BelongsTo(() => User, "user_id")
    user: User;

    @HasMany(() => MenuDetail, "menu_id")
    menuDetails: MenuDetail;
}

// Autoload Model
export default Menu;
