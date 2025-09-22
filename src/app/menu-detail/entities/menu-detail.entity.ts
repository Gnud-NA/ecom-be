import Menu from "@src/app/menu/entities/menu.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "wf_menu_details" })
export class MenuDetail extends BaseModelSequelize<MenuDetail> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.TEXT })
    name: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "icon", type: DataType.TEXT })
    icon: string;

    @Column({ field: "image", type: DataType.TEXT })
    image: string;

    @Column({ field: "url", type: DataType.TEXT })
    url: string;

    @ForeignKey(() => MenuDetail)
    @Column({ field: "parent_id", type: DataType.INTEGER })
    parentId: number;

    @ForeignKey(() => Menu)
    @Column({ field: "menu_id", type: DataType.INTEGER })
    menuId: number;

    @Column({ field: "priority", type: DataType.INTEGER })
    priority: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @BelongsTo(() => Menu, "menu_id")
    menu: Menu;

    @BelongsTo(() => MenuDetail, "parent_id")
    parent: MenuDetail;

    @HasMany(() => MenuDetail)
    childs: MenuDetail[];
}

// Autoload Model
export default MenuDetail;
