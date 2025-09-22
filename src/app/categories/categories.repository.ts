import { Injectable } from "@nestjs/common";
import Category from "@src/app/categories/entities/category.entity";
import { BaseRepositorySequelize } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CategoryRepository extends BaseRepositorySequelize<Category> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Category");
    }

    async findAllTest(filter: PaginationQuery & any): Promise<Category[] | []> {
        const categories = await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: { ...filter.where },
        });
        return categories;
    }

    async findBySlug(slug: string): Promise<Category> {
        const category = await this.model.findOne({
            where: { slug, deletedAt: null },
        });
        return category;
    }
}
