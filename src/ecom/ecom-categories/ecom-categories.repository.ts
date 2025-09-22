import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class EcomCategoryRepository extends BaseRepositorySequelize<EcomCategory> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "EcomCategory");
    }

    async findAllTest(filter: PaginationQuery & any): Promise<EcomCategory[] | []> {
        const ecomCategories = await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: { ...filter.where },
        });
        return ecomCategories;
    }

    async findBySlug(slug: string): Promise<EcomCategory> {
        const ecomCategory = await this.model.findOne({
            where: { slug, deletedAt: null, status: true },
        });
        return ecomCategory;
    }
    async findBySlugAndBrandName(slug: string, brandName: string): Promise<EcomCategory> {
        const ecomCategory = await this.model.findOne({
            where: { slug, deletedAt: null, status: true, brandName },
        });
        return ecomCategory;
    }
}
