import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Color from "@src/ecom/color/entities/color.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ColorRepository extends BaseRepositorySequelize<Color> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Color");
    }
}
