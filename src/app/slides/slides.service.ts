import { Injectable } from "@nestjs/common";
import { CreateSlideDto } from "@src/app/slides/dto/create-slide.dto";
import { SlideFilter } from "@src/app/slides/dto/slides.dto";
import { UpdateSlideDto } from "@src/app/slides/dto/update-slide.dto";
import Slide from "@src/app/slides/entities/slide.entity";
import { SlidesRepository } from "@src/app/slides/slides.repository";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { convertFilterWithOrderBy } from "@src/utils";

@Injectable()
export class SlidesService extends BaseService<Slide, SlidesRepository> {
    constructor(private readonly slideRepo: SlidesRepository) {
        super(slideRepo);
    }

    async create(createSlidesDto: CreateSlideDto) {
        const slide = await this.slideRepo.create(createSlidesDto);
        return this.findOne(slide.id);
    }

    async findAll(filter?: SlideFilter) {
        return await this.slideRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...filter.where,
                // ...insertIfObject(filter?.where?.parentId === "", { parentId: { [Op.eq]: null } }),
            },
            include: [
                { model: User, attributes: ["id", "email", "username"] },
                { association: "slideDetails" },
                // { association: "parent" }
            ],
        });
    }

    async update(id: number, updateCategoryDto: UpdateSlideDto) {
        await this.slideRepo.updateById(id, updateCategoryDto);
        return this.findOne(id);
    }
}
