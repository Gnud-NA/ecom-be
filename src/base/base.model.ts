import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { Column, Model } from "sequelize-typescript";
import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class AbstractModel {
    id: number | string;
    [key: string]: any;
}

export class BaseModel extends BaseEntity {
    @CreateDateColumn({
        default: `now()`,
        name: "created_at",
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: `now()`,
        name: "updated_at",
    })
    updatedAt: Date;

    @DeleteDateColumn({
        default: null,
        nullable: true,
        name: "deleted_at",
        type: "timestamptz",
    })
    deletedAt: Date;
}

export class BaseModelSequelize<T> extends Model<T> {
    @Expose()
    @ApiProperty()
    @Column({ primaryKey: true, autoIncrement: true })
    @Type(() => Number)
    id: number;

    @Expose()
    @ApiProperty()
    @Column({ field: "created_at", type: "timestamptz" })
    createdAt: Date;

    @Expose()
    @ApiProperty()
    @Column({ field: "updated_at", type: "timestamptz" })
    updatedAt: Date;

    @Exclude()
    @ApiProperty()
    @Column({
        field: "deleted_at",
        type: "timestamptz",
        allowNull: true,
    })
    deletedAt: Date;

    // toJSON() {
    //   return this?.dataValues;
    // }
}
