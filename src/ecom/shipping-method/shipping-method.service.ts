import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CreateShippingMethodDto } from "@src/ecom/shipping-method/dto/create-shipping-method.dto";
import { FilterShippingMethodDto } from "@src/ecom/shipping-method/dto/shipping-method.dto";
import { UpdateShippingMethodDto } from "@src/ecom/shipping-method/dto/update-shipping-method.dto";
import ShippingMethod from "@src/ecom/shipping-method/entities/shipping-method.entity";
import { ShippingMethodRepository } from "@src/ecom/shipping-method/shipping-method.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ShippingMethodService extends BaseService<ShippingMethod, ShippingMethodRepository> {
    constructor(
        @Inject(ShippingMethodRepository)
        private readonly shippingMethodRepository: ShippingMethodRepository,
        private sequelize: Sequelize
    ) {
        super(shippingMethodRepository);
    }

    async create(createShippingMethodDto: CreateShippingMethodDto) {
        const shippingMethod = await this.shippingMethodRepository.create(createShippingMethodDto);
        return await this.findOne(shippingMethod.id);
    }

    async findAll(filter?: FilterShippingMethodDto): Promise<BaseResponse<ShippingMethod[]>> {
        const shippingMethods = await this.shippingMethodRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.shippingMethodRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: shippingMethods,
        };
    }

    async update(id: number, updateShippingMethodDto: UpdateShippingMethodDto) {
        await this.shippingMethodRepository.updateByIdWithBase(id, updateShippingMethodDto);

        const shippingMethod = await this.shippingMethodRepository.findById(id);

        return this.findOne(shippingMethod.id);
    }
}
