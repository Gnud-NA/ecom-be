import { Injectable } from "@nestjs/common";
import MenuDetail from "@src/app/menu-detail/entities/menu-detail.entity";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class MenuDetailRepository extends BaseRepositorySequelize<MenuDetail> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "MenuDetail");
    }

    async getMaxPriority() {
        return await this.model.max("priority");
    }
}
