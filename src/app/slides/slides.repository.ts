import { Injectable } from "@nestjs/common";
import Slide from "@src/app/slides/entities/slide.entity";
import { BaseRepositorySequelize } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SlidesRepository extends BaseRepositorySequelize<Slide> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Slide");
    }

    async findAllTest(filter: PaginationQuery & any): Promise<Slide[] | []> {
        const slides = await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: { ...filter.where },
        });
        return slides;
    }
}
