import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "@src/app/users/users.repository";
import { BaseDeletedResponse } from "@src/base";
import { OrderStatusEnum, RegistryDetailStatusEnum } from "@src/config/ecom";
import { ColorRepository } from "@src/ecom/color/color.repository";
import { Color } from "@src/ecom/color/entities/color.entity";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import Order from "@src/ecom/order/entities/order.entity";
import { ProductColor } from "@src/ecom/product-color/entities/product-color.entity";
import { ProductSize } from "@src/ecom/product-size/entities/product-size.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { RegistryDetailFilter, RegistryDetailListResponse } from "@src/ecom/registry-detail/dto/registry-detail.dto";
import RegistryEvent from "@src/ecom/registry-event/entities/registry-event.entity";
import Registry from "@src/ecom/registry/entities/registry.entity";
import { RegistryRepository } from "@src/ecom/registry/registry.repository";
import { Size } from "@src/ecom/size/entities/size.entity";
import { SizeRepository } from "@src/ecom/size/size.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere, insertIfObject } from "@src/utils/common.util";
import { Op } from "sequelize";
import { Repository } from "typeorm";
import { CreateRegistryDetailDto } from "./dto/create-registry-detail.dto";
import RegistryDetail from "./entities/registry-detail.entity";
import { RegistryDetailRepository } from "./registry-detail.repository";
import moment = require("moment");

@Injectable()
export class RegistryDetailService {
    constructor(
        private registryDetailRepo: RegistryDetailRepository,
        private userRepo: UserRepository,
        private productRepo: ProductRepository,
        private registryRepo: RegistryRepository,
        @Inject(OrderDetailRepository)
        private orderDetailRepo: OrderDetailRepository,
        private colorRepo: ColorRepository,
        private sizeRepo: SizeRepository,
        @InjectRepository(ProductColor)
        private productColorRepo: Repository<ProductColor>,
        @InjectRepository(ProductSize)
        private productSizeRepo: Repository<ProductSize>
    ) {}

    async create(createRegistryDetailDto: CreateRegistryDetailDto): Promise<RegistryDetail> {
        try {
            const product = await this.productRepo.findOne({
                where: {
                    id: createRegistryDetailDto.productId,
                },
            });
            if (!product) {
                throw new BadRequestException("Product not found");
            }

            const registry = await this.registryRepo.findOne({
                where: {
                    id: createRegistryDetailDto.registryId,
                },
            });
            if (!registry) {
                throw new BadRequestException("Registry not found");
            }

            if (registry.eventDate) {
                const today = moment();
                const eventDate = moment(registry.eventDate);

                const diffDays = today.diff(eventDate, "days");
                if (diffDays > 0) {
                    throw new ForbiddenException("This event happened in the past");
                }
            }

            const currentRegistryDetail = await this.registryDetailRepo.findOne({
                where: {
                    registryId: createRegistryDetailDto.registryId,
                    productId: createRegistryDetailDto.productId,
                    ...(createRegistryDetailDto.colorId && { colorId: createRegistryDetailDto.colorId }),
                    ...(createRegistryDetailDto.sizeId && { sizeId: createRegistryDetailDto.sizeId }),
                },
            });

            if (currentRegistryDetail) {
                throw new BadRequestException("Product already in registry");
            }

            if (createRegistryDetailDto.colorId) {
                const productColor = await this.productColorRepo.findOne({
                    where: {
                        productId: createRegistryDetailDto.productId,
                        colorId: createRegistryDetailDto.colorId,
                    },
                });
                if (!productColor) {
                    throw new BadRequestException("Color not available for this product");
                }
            }

            if (createRegistryDetailDto.sizeId) {
                const productSize = await this.productSizeRepo.findOne({
                    where: {
                        productId: createRegistryDetailDto.productId,
                        sizeId: createRegistryDetailDto.sizeId,
                    },
                });
                if (!productSize) {
                    throw new BadRequestException("Size not available for this product");
                }
            }

            const registryDetail = await this.registryDetailRepo.create(createRegistryDetailDto);

            return registryDetail;
        } catch (error) {
            throw error;
        }
    }

    async findAll(params?: RegistryDetailFilter, requesterId?: number): Promise<RegistryDetailListResponse> {
        try {
            const registry = await this.registryRepo.findOne({
                where: {
                    id: params.registryId,
                },
                include: [
                    {
                        model: RegistryEvent,
                        as: "registryEvent",
                    },
                ],
            });

            if (!registry) {
                throw new BadRequestException("Registry not found");
            }

            if (!requesterId || Number(requesterId) !== Number(registry.userId)) {
                if (registry.isPrivate) {
                    if (params.pinCode !== registry.pinCode) {
                        throw new ForbiddenException("Invalid PIN code");
                    }
                }
            }

            const itemPurchased = await this.orderDetailRepo.count({
                where: {
                    registryId: params.registryId,
                },
                include: [
                    {
                        model: Order,
                        as: "order",
                        required: true,
                        where: {
                            orderStatus: {
                                [Op.not]: OrderStatusEnum.CANCELLED,
                            },
                        },
                    },
                ],
            });

            const today = moment().startOf("day");
            const eventDate = moment(registry.eventDate).startOf("day");

            const daysUntilEvent = eventDate.isBefore(today, "day") ? 0 : eventDate.diff(today, "days");

            if (params.status === RegistryDetailStatusEnum.NON_PURCHASE) {
                // Find all product IDs that have order details with this registry ID
                const orderDetailsWithRegistry = await this.orderDetailRepo.find({
                    where: {
                        registryId: params.registryId,
                    },
                });
                const purchasedProductIds = orderDetailsWithRegistry.map((order) => order.productId);

                const { count, data } = await this.registryDetailRepo.findAndCount({
                    ...convertFilterWithOrderBy(params),
                    where: {
                        ...convertFilterWithWhere(params),
                        registryId: params.registryId,
                        productId: {
                            [Op.notIn]: purchasedProductIds,
                        },
                    },
                    include: [
                        {
                            model: Product,
                            as: "product",
                            where: {
                                ...(params.brandName ? { brandName: params.brandName } : {}),
                            },
                        },
                        {
                            model: Color,
                            as: "color",
                            required: false,
                        },
                        {
                            model: Size,
                            as: "size",
                            required: false,
                        },
                    ],
                    distinct: true,
                } as any);

                const mappedData = data.map((detail) => {
                    return {
                        isPurchased: false,
                        ...detail.toJSON(),
                    };
                });

                return {
                    count,
                    data: {
                        data: mappedData,
                        registry: {
                            ...registry,
                            itemPurchased: itemPurchased || 0,
                            daysUntilEvent: Number(daysUntilEvent || 0),
                        },
                    },
                } as any;
            } else {
                const { count, data } = await this.registryDetailRepo.findAndCount({
                    ...convertFilterWithOrderBy(params),
                    where: {
                        ...convertFilterWithWhere(params),
                        registryId: params.registryId,
                    },
                    distinct: true,
                    include: [
                        {
                            model: Product,
                            as: "product",
                            where: {
                                ...(params.brandName ? { brandName: params.brandName } : {}),
                            },
                            required: true,
                            include: [
                                {
                                    model: OrderDetail,
                                    as: "orderDetails",
                                    where: {
                                        registry_id: params.registryId,
                                    },
                                    ...insertIfObject(
                                        params.status === RegistryDetailStatusEnum.PURCHASE,
                                        {
                                            required: true,
                                        },
                                        { required: false }
                                    ),
                                    attributes: ["id", "registryId"],
                                },
                            ],
                        },
                        {
                            model: Color,
                            as: "color",
                            required: false,
                        },
                        {
                            model: Size,
                            as: "size",
                            required: false,
                        },
                    ],
                } as any);

                const mappedData = data.map((detail) => {
                    const isPurchased = detail?.product?.orderDetails?.length > 0;
                    return {
                        isPurchased,
                        ...detail.toJSON(),
                    };
                });

                return {
                    count,
                    data: {
                        data: mappedData,
                        registry: {
                            ...registry,
                            itemPurchased: itemPurchased || 0,
                            daysUntilEvent: Number(daysUntilEvent || 0),
                        },
                    },
                } as any;
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number, requesterId: number): Promise<BaseDeletedResponse> {
        try {
            const registryDetail = await this.registryDetailRepo.findById(id, {
                include: [
                    {
                        model: Registry,
                        as: "registry",
                    },
                ],
            });
            if (!registryDetail) {
                throw new BadRequestException("Registry detail not found");
            }

            if (registryDetail.registry.userId !== requesterId) {
                throw new ForbiddenException("You are not allowed to delete this registry detail");
            }

            await registryDetail.destroy();
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}
