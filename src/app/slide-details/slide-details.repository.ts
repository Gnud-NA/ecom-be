import { Injectable } from "@nestjs/common";
import SlideDetail from "@src/app/slide-details/entities/slide-detail.entity";
import { BaseRepositorySequelize } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SlideDetailsRepository extends BaseRepositorySequelize<SlideDetail> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "SlideDetail");
    }

    async findAllTest(filter: PaginationQuery & any): Promise<SlideDetail[] | []> {
        const slides = await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: { ...filter.where },
        });
        return slides;
    }
    async getMaxByField(field: keyof SlideDetail): Promise<number> {
        const max = await this.model.max(field);
        return Number(max ?? 0);
    }
}
