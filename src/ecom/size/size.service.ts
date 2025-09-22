import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CreateSizeDto } from "@src/ecom/size/dto/create-size.dto";
import { FilterSizeDto } from "@src/ecom/size/dto/size.dto";
import { UpdateSizeDto } from "@src/ecom/size/dto/update-size.dto";
import Size from "@src/ecom/size/entities/size.entity";
import { SizeRepository } from "@src/ecom/size/size.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SizeService extends BaseService<Size, SizeRepository> {
    constructor(
        @Inject(SizeRepository)
        private readonly sizeRepository: SizeRepository,
        private sequelize: Sequelize
    ) {
        super(sizeRepository);
    }

    async create(createSizeDto: CreateSizeDto) {
        const size = await this.sizeRepository.create(createSizeDto);
        return await this.findOne(size.id);
    }

    async findAll(filter?: FilterSizeDto): Promise<BaseResponse<Size[]>> {
        const sizes = await this.sizeRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.sizeRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: sizes,
        };
    }

    async update(id: number, updateSizeDto: UpdateSizeDto) {
        await this.sizeRepository.updateByIdWithBase(id, updateSizeDto);

        const size = await this.sizeRepository.findById(id);

        return this.findOne(size.id);
    }
}
