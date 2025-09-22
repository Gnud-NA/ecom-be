import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import { CategoryFilter } from "@src/app/categories/dto/category.dto";
import { Category } from "@src/app/categories/entities/category.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";
import { Op } from "sequelize";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto, UpdateCategoryPriority } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService extends BaseService<Category, CategoryRepository> {
    constructor(private readonly categoryRepo: CategoryRepository) {
        super(categoryRepo);
    }

    async create(createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryRepo.create(createCategoryDto);
        return this.findOne(category.id);
    }

    async findAll(filter?: CategoryFilter) {
        return await this.categoryRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter.where,
                ...insertIfObject(!!filter?.postType, { postType: filter?.postType }),
            },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                // { association: "childs" },
                // { association: "parent" },
            ],
        });
    }

    async findOne(id: number) {
        return this.categoryRepo.findOne({
            where: { id },
            include: [{ model: User, attributes: ["id", "email", "username"] }],
        });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        await this.categoryRepo.updateById(id, updateCategoryDto);
        return this.findOne(id);
    }

    async updateCategoryByPriority(
        categoryId: number,
        updateCategoryPriority: UpdateCategoryPriority
    ): Promise<Category> {
        const { newOrder, postType } = updateCategoryPriority;
        const categoryToUpdate = await this.categoryRepo.findById(categoryId);

        if (!categoryToUpdate) {
            throw new Error(`Category with ID ${categoryId} not found.`);
        }

        const siblings = await this.categoryRepo.find({
            where: {
                ...insertIfObject(
                    categoryToUpdate?.parentId === null || !categoryToUpdate?.parentId,
                    { parentId: { [Op.eq]: null } },
                    { parentId: categoryToUpdate.parentId }
                ),
                postType,
            },
            order: [["priority", "ASC"]] as any,
        });

        const currentIndex = siblings.findIndex((cat) => cat.id === categoryToUpdate.id);
        siblings.splice(currentIndex, 1);
        siblings.splice(newOrder, 0, categoryToUpdate);

        for (let i = 0; i < siblings.length; i++) {
            siblings[Number(i)].priority = i;
            await siblings[i].save();
        }

        return this.findOne(categoryId);
    }
}
