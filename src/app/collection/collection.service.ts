import { Injectable } from "@nestjs/common";
import { CollectionRepository } from "@src/app/collection/collection.repository";
import { CollectionFilter } from "@src/app/collection/dto/collection.dto";
import { CreateCollectionDto } from "@src/app/collection/dto/create-collection.dto";
import Collection from "@src/app/collection/entities/collection.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";
import { Op } from "sequelize";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@Injectable()
export class CollectionService extends BaseService<Collection, CollectionRepository> {
    constructor(private readonly collectionRepo: CollectionRepository) {
        super(collectionRepo);
    }

    async create(createCollectionDto: CreateCollectionDto) {
        const category = await this.collectionRepo.create(createCollectionDto);
        return this.findOne(category.id);
    }

    async findAll(filter?: CollectionFilter) {
        return await this.collectionRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter.where,
                ...insertIfObject(filter?.where?.parentId === "", { parentId: { [Op.eq]: null } }),
            },
            include: [{ model: User, attributes: ["id", "email", "username"] }, { association: "parent" }],
        });
    }

    async update(id: number, updateCategoryDto: UpdateCollectionDto) {
        await this.collectionRepo.updateById(id, updateCategoryDto);
        return this.findOne(id);
    }
}
