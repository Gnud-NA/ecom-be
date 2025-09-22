import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CreateOrderDetailDto } from "@src/ecom/order-detail/dto/create-order-detail.dto";
import { FilterOrderDetailDto } from "@src/ecom/order-detail/dto/order-detail.dto";
import { UpdateOrderDetailDto } from "@src/ecom/order-detail/dto/update-order-detail.dto";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class OrderDetailService extends BaseService<OrderDetail, OrderDetailRepository> {
    constructor(
        @Inject(OrderDetailRepository)
        private readonly orderDetailRepository: OrderDetailRepository,
        private sequelize: Sequelize
    ) {
        super(orderDetailRepository);
    }

    async create(createOrderDetailDto: CreateOrderDetailDto) {
        const orderDetail = await this.orderDetailRepository.create(createOrderDetailDto);
        return await this.findOne(orderDetail.id);
    }

    async findAll(filter?: FilterOrderDetailDto): Promise<BaseResponse<OrderDetail[]>> {
        const orderDetails = await this.orderDetailRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.orderDetailRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: orderDetails,
        };
    }

    async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
        await this.orderDetailRepository.updateByIdWithBase(id, updateOrderDetailDto);

        const orderDetail = await this.orderDetailRepository.findById(id);

        return this.findOne(orderDetail.id);
    }
}
