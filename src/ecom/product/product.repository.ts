import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { BASE_FILTER } from "@src/config";
import Color from "@src/ecom/color/entities/color.entity";
import { EcomCategoryFilter } from "@src/ecom/ecom-categories/dto/ecom-category.dto";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import Product from "@src/ecom/product/entities/product.entity";
import Size from "@src/ecom/size/entities/size.entity";
import { convertFilterWithOrderBy, convertFilterWithWhere, insertIfObject } from "@src/utils";
import { isArray } from "ramda-adjunct";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ProductRepository extends BaseRepositorySequelize<Product> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Product");
    }

    async findWithActive(filter: any): Promise<Product[]> {
        return await this.model.findAll({
            where: { deletedAt: null, ...convertFilterWithWhere(filter), status: true },
            ...filter,
        });
    }

    async findBySlug(slug: string, safeUserId?: number): Promise<Product> {
        return await this.model.findOne({
            where: { slug: slug, deletedAt: null },
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) > 0
                            FROM ecom_favorites AS f
                            WHERE f.product_id = "Product"."id" AND f.user_id = ${Number(safeUserId) || 0}
                        )`),
                        "isFavorite",
                    ],
                ],
            },
            include: [
                {
                    model: EcomCategory,
                },
                "media",
                "ecomCategories",
                "colors",
                "sizes",
                "galleries",
            ],
        });
    }

    async findByCategoryId(categoryId: number, filter?: EcomCategoryFilter, safeUserId?: number): Promise<Product[]> {
        return await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: {
                deletedAt: null,
                ...convertFilterWithWhere(filter), // ...filter?.where,
                status: true,
                ...insertIfObject(filter?.minPrice || filter?.maxPrice, {
                    [Op.and]: [
                        { ...insertIfObject(filter?.minPrice, { showPrice: { [Op.gte]: Number(filter?.minPrice) } }) },
                        { ...insertIfObject(filter?.maxPrice, { showPrice: { [Op.lte]: Number(filter?.maxPrice) } }) },
                    ],
                }),
            },
            limit: filter?.limit ?? BASE_FILTER.LIMIT_DEFAULT,
            offset: filter?.offset ?? BASE_FILTER.OFFSET_DEFAULT,
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*) > 0
                            FROM ecom_favorites AS f
                            WHERE f.product_id = "Product"."id" AND f.user_id = ${Number(safeUserId) || 0}
                        )`),
                        "isFavorite",
                    ],
                ],
            },
            include: [
                {
                    model: EcomCategory,
                    required: true,
                    where: {
                        id: categoryId,
                    },
                    through: {
                        attributes: [], // Để loại bỏ các trường không cần thiết trong bảng liên kết (junction table)
                    },
                },
                ...(insertIfObject(
                    filter?.colorIds,
                    [
                        {
                            model: Color,
                            as: "colors",
                            required: true,
                            where: {
                                id: { [Op.in]: isArray(filter?.colorIds) ? filter?.colorIds : [filter?.colorIds] },
                            },
                        },
                    ],
                    []
                ) as []),
                ...(insertIfObject(
                    filter?.sizeIds,
                    [
                        {
                            model: Size,
                            as: "sizes",
                            required: true,
                            where: {
                                id: { [Op.in]: isArray(filter?.sizeIds) ? filter?.sizeIds : [filter?.sizeIds] },
                            },
                        },
                    ],
                    []
                ) as []),
                "media",
                "ecomCategories",
                "colors",
                "sizes",
                "galleries",
            ],
        });
    }

    async countByCategoryId(categoryId: number, filter?: EcomCategoryFilter): Promise<number> {
        return await this.model.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                deletedAt: null,
                ...convertFilterWithWhere(filter), // ...filter?.where,
                status: true,
                ...insertIfObject(filter?.minPrice || filter?.maxPrice, {
                    [Op.and]: [
                        { ...insertIfObject(filter?.minPrice, { showPrice: { [Op.gte]: Number(filter?.minPrice) } }) },
                        { ...insertIfObject(filter?.maxPrice, { showPrice: { [Op.lte]: Number(filter?.maxPrice) } }) },
                    ],
                }),
            },
            include: [
                {
                    model: EcomCategory,
                    required: true,
                    where: {
                        id: categoryId,
                    },
                    through: {
                        attributes: [], // Để loại bỏ các trường không cần thiết trong bảng liên kết (junction table)
                    },
                },
                ...(insertIfObject(
                    filter?.colorIds,
                    [
                        {
                            model: Color,
                            as: "colors",
                            required: true,
                            where: {
                                id: { [Op.in]: isArray(filter?.colorIds) ? filter?.colorIds : [filter?.colorIds] },
                            },
                        },
                    ],
                    []
                ) as []),
                ...(insertIfObject(
                    filter?.sizeIds,
                    [
                        {
                            model: Size,
                            as: "sizes",
                            required: true,
                            where: {
                                id: { [Op.in]: isArray(filter?.sizeIds) ? filter?.sizeIds : [filter?.sizeIds] },
                            },
                        },
                    ],
                    []
                ) as []),
                // "media",
                // "colors",
                // "sizes",
                // "galleries",
            ],
        });
    }
}
