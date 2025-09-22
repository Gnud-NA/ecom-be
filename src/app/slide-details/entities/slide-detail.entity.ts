import Menu from "@src/app/menu/entities/menu.entity";
import Slide from "@src/app/slides/entities/slide.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsToOptions } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";

@Table({ tableName: "wf_slide_details" })
export class SlideDetail extends BaseModelSequelize<SlideDetail> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "title", type: DataType.STRING(256) })
    title: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "content", type: DataType.TEXT })
    content: string;

    @Column({ field: "status", type: DataType.BOOLEAN, defaultValue: true })
    status: boolean;

    @Column({ field: "image", type: DataType.STRING(256) })
    image: string;

    @Column({ field: "background", type: DataType.TEXT })
    background: string;

    @Column({ field: "menu_wf_code", type: DataType.TEXT })
    menuWfCode: string;

    @Column({ field: "order", type: DataType.INTEGER })
    order: number;

    @ForeignKey(() => Slide)
    @Column({ field: "slide_id", type: DataType.BIGINT })
    slideId: number;

    @BelongsTo(() => Slide, "slide_id")
    slide: Slide;

    @BelongsTo(() => Menu, {
        foreignKey: "menuWfCode",
        targetKey: "wfCode",
        as: "menu",
        source: Menu,
        keyType: DataType.TEXT,
    } as BelongsToOptions)
    menu: Menu;
}

// Autoload Model
export default SlideDetail;
