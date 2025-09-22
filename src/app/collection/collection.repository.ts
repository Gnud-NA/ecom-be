import { Injectable } from "@nestjs/common";
import Collection from "@src/app/collection/entities/collection.entity";
import { BaseRepositorySequelize } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CollectionRepository extends BaseRepositorySequelize<Collection> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Collection");
    }

    async findAllTest(filter: PaginationQuery & any): Promise<Collection[] | []> {
        const categories = await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: { ...filter.where },
        });
        return categories;
    }
}
