import SlideDetail from "@src/app/slide-details/entities/slide-detail.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseModelSequelize } from "@src/base";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";

@Table({ tableName: "wf_slides" })
export class Slide extends BaseModelSequelize<Slide> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ field: "name", type: DataType.STRING(256) })
    name: string;

    @Column({ field: "description", type: DataType.TEXT })
    description: string;

    @Column({ field: "status", type: DataType.BOOLEAN, defaultValue: true })
    status: boolean;

    @Column({ field: "wf_code", type: DataType.STRING(256) })
    wfCode: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id", type: DataType.BIGINT })
    userId: number;

    @BelongsTo(() => User, "user_id")
    user: User;

    @HasMany(() => SlideDetail, "slide_id")
    slideDetails: SlideDetail[];
}

// Autoload Model
export default Slide;
