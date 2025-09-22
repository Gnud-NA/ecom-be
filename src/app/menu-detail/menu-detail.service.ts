import { Injectable } from "@nestjs/common";
import { MenuDetailFilter } from "@src/app/menu-detail/dto/menu-detail.dto";
import { MenuDetail } from "@src/app/menu-detail/entities/menu-detail.entity";
import { MenuDetailRepository } from "@src/app/menu-detail/menu-detail.repository";
import Menu from "@src/app/menu/entities/menu.entity";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";
import { Op } from "sequelize";
import { CreateMenuDetailDto } from "./dto/create-menu-detail.dto";
import { UpdateMenuDetailDto, UpdateMenuDetailPriority } from "./dto/update-menu-detail.dto";

@Injectable()
export class MenuDetailService extends BaseService<MenuDetail, MenuDetailRepository> {
    constructor(private readonly menuDetailRepo: MenuDetailRepository) {
        super(menuDetailRepo);
    }

    async create(createMenuDetailDto: CreateMenuDetailDto) {
        const maxMenuDetail = await this.menuDetailRepo.getMaxPriority();
        const menuDetail = await this.menuDetailRepo.create({
            ...createMenuDetailDto,
            priority: Number(Number(maxMenuDetail ?? 0) + 1),
        });

        return this.findOne(menuDetail.id);
    }

    async findAll(filter?: MenuDetailFilter) {
        return await this.menuDetailRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter.where,
                ...insertIfObject(!!filter?.menuId, { menuId: Number(filter?.menuId) }),
            },
            include: [{ model: Menu }],
        });
    }

    async findOne(id: number) {
        return this.menuDetailRepo.findOne({
            where: { id },
            include: [{ model: User, attributes: ["id", "email", "username"] }],
        });
    }

    async update(id: number, updateMenuDetailDto: UpdateMenuDetailDto) {
        await this.menuDetailRepo.updateById(id, updateMenuDetailDto);
        return this.findOne(id);
    }

    async updateMenuDetailByPriority(
        menuDetailId: number,
        updateMenuDetailPriority: UpdateMenuDetailPriority
    ): Promise<MenuDetail> {
        const { newOrder } = updateMenuDetailPriority;
        const menuDetailToUpdate = await this.menuDetailRepo.findById(menuDetailId);

        if (!menuDetailToUpdate) {
            throw new Error(`MenuDetail with ID ${menuDetailId} not found.`);
        }

        const siblings = await this.menuDetailRepo.find({
            where: {
                menuId: menuDetailToUpdate.menuId,
                ...insertIfObject(
                    menuDetailToUpdate?.parentId === null || !menuDetailToUpdate?.parentId,
                    { parentId: { [Op.eq]: null } },
                    { parentId: menuDetailToUpdate.parentId }
                ),
            },
            order: [["priority", "ASC"]],
        });

        const currentIndex = siblings.findIndex((cat) => cat.id === menuDetailToUpdate.id);
        siblings.splice(currentIndex, 1);
        siblings.splice(newOrder, 0, menuDetailToUpdate);

        for (let i = 0; i < siblings.length; i++) {
            siblings[Number(i)].priority = i;
            await siblings[Number(i)].save();
        }

        return this.findOne(menuDetailId);
    }
}
