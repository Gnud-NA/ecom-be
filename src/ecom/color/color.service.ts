import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { ColorRepository } from "@src/ecom/color/color.repository";
import { FilterColorDto } from "@src/ecom/color/dto/color.dto";
import { CreateColorDto } from "@src/ecom/color/dto/create-color.dto";
import { UpdateColorDto } from "@src/ecom/color/dto/update-color.dto";
import Color from "@src/ecom/color/entities/color.entity";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ColorService extends BaseService<Color, ColorRepository> {
    constructor(
        @Inject(ColorRepository)
        private readonly colorRepository: ColorRepository,
        private sequelize: Sequelize
    ) {
        super(colorRepository);
    }

    async create(createColorDto: CreateColorDto) {
        const color = await this.colorRepository.create(createColorDto);
        return await this.findOne(color.id);
    }

    async findAll(filter?: FilterColorDto): Promise<BaseResponse<Color[]>> {
        const colors = await this.colorRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.colorRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: colors,
        };
    }

    async update(id: number, updateColorDto: UpdateColorDto) {
        await this.colorRepository.updateByIdWithBase(id, updateColorDto);

        const color = await this.colorRepository.findById(id);

        return this.findOne(color.id);
    }
}
