import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Size from "@src/ecom/size/entities/size.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SizeRepository extends BaseRepositorySequelize<Size> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Size");
    }
}
