import { Injectable } from "@nestjs/common";
import Menu from "@src/app/menu/entities/menu.entity";
import { BaseRepositorySequelize } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class MenuRepository extends BaseRepositorySequelize<Menu> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Menu");
    }

    async findAllTest(filter: PaginationQuery & any): Promise<Menu[] | []> {
        const menus = await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: { ...filter.where },
        });
        return menus;
    }
}
