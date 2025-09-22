import { Injectable } from "@nestjs/common";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { MediaAbleTypeEnum } from "@src/config";
import { EcomCategoryFilter } from "@src/ecom/ecom-categories/dto/ecom-category.dto";
import {
    UpdateEcomCategoryDto,
    UpdateEcomCategoryPriority,
} from "@src/ecom/ecom-categories/dto/ecom-update-category.dto";
import { EcomCategoryRepository } from "@src/ecom/ecom-categories/ecom-categories.repository";
import { EcomCategory } from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { convertFilterWithOrderBy, convertFilterWithWhere, insertIfObject } from "@src/utils";
import { Op } from "sequelize";
import { CreateEcomCategoryDto } from "./dto/ecom-create-category.dto";

@Injectable()
export class EcomCategoriesService extends BaseService<EcomCategory, EcomCategoryRepository> {
    constructor(private readonly categoryRepo: EcomCategoryRepository) {
        super(categoryRepo);
    }

    async create(createCategoryDto: CreateEcomCategoryDto) {
        const category = await this.categoryRepo.create(createCategoryDto);
        if (category && createCategoryDto?.mediaId) {
            this.categoryRepo.updateById(createCategoryDto.mediaId, {
                mediaableId: category.id,
                mediaableType: MediaAbleTypeEnum.ECOM_CATEGORY,
            });
        }
        return this.findOne(category.id);
    }

    async findAll(filter?: EcomCategoryFilter) {
        return await this.categoryRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
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

    async update(id: number, updateCategoryDto: UpdateEcomCategoryDto) {
        await this.categoryRepo.updateById(id, updateCategoryDto);
        return this.findOne(id);
    }

    async updateCategoryByPriority(
        categoryId: number,
        updateCategoryPriority: UpdateEcomCategoryPriority
    ): Promise<EcomCategory> {
        const { newOrder } = updateCategoryPriority;
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
