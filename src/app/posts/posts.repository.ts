import { Injectable } from "@nestjs/common";
import { CategoryFilter } from "@src/app/categories/dto/category.dto";
import Category from "@src/app/categories/entities/category.entity";
import Post from "@src/app/posts/entities/post.entity";
import { BaseRepositorySequelize } from "@src/base";
import { BASE_FILTER } from "@src/config";
import { convertFilterWithOrderBy } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class PostsRepository extends BaseRepositorySequelize<Post> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Post");
    }

    async findWithActive(filter: any): Promise<Post[]> {
        return await this.model.findAll({
            where: { deletedAt: null, ...filter?.where, status: true },
            ...filter,
        });
    }

    async findBySlug(slug: string): Promise<Post> {
        return await this.model.findOne({
            where: { slug: slug, deletedAt: null },
            include: [
                {
                    model: Category,
                },
                "media",
                "categories",
            ],
        });
    }

    async findByCategoryId(categoryId: number, filter?: CategoryFilter): Promise<Post[]> {
        return await this.model.findAll({
            ...convertFilterWithOrderBy(filter),
            where: {
                deletedAt: null,
                ...filter?.where,
                postType: filter?.postType,
                status: true,
            },
            limit: filter?.limit ?? BASE_FILTER.LIMIT_DEFAULT,
            offset: filter?.offset ?? BASE_FILTER.OFFSET_DEFAULT,
            include: [
                {
                    model: Category,
                    required: true,
                    where: {
                        id: categoryId,
                    },
                    through: {
                        attributes: [], // Để loại bỏ các trường không cần thiết trong bảng liên kết (junction table)
                    },
                },
                "media",
            ],
        });
    }

    async countByCategoryId(categoryId: number, filter?: CategoryFilter): Promise<number> {
        return await this.model.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                deletedAt: null,
                ...filter?.where,
                postType: filter?.postType,
                status: true,
            },
            include: [
                {
                    model: Category,
                    required: true,
                    where: {
                        id: categoryId,
                    },
                    through: {
                        attributes: [], // Để loại bỏ các trường không cần thiết trong bảng liên kết (junction table)
                    },
                },
                // { model: Media },
            ],
        });
    }
}
