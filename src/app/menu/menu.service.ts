import { Injectable } from "@nestjs/common";
import { CreateMenuDto } from "@src/app/menu/dto/create-menu.dto";
import { MenuFilter } from "@src/app/menu/dto/menu.dto";
import { UpdateMenuDto } from "@src/app/menu/dto/update-menu.dto";
import Menu from "@src/app/menu/entities/menu.entity";
import { MenuRepository } from "@src/app/menu/menu.repository";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { convertFilterWithOrderBy, insertIfObject } from "@src/utils";

@Injectable()
export class MenuService extends BaseService<Menu, MenuRepository> {
    constructor(private readonly menuRepo: MenuRepository) {
        super(menuRepo);
    }

    async create(createMenuDto: CreateMenuDto) {
        const category = await this.menuRepo.create(createMenuDto);
        return this.findOne(category.id);
    }

    async findAll(filter?: MenuFilter) {
        return await this.menuRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter.where,
                ...insertIfObject(!!filter?.wfCode, { wfCode: filter?.wfCode }),
            },
            include: [{ model: User, attributes: ["id", "email", "username"] }],
        });
    }

    async findOne(id: number) {
        return this.menuRepo.findOne({
            where: { id },
            include: [{ model: User, attributes: ["id", "email", "username"] }],
        });
    }

    async update(id: number, updateMenuDto: UpdateMenuDto) {
        await this.menuRepo.updateById(id, updateMenuDto);
        return this.findOne(id);
    }
}
