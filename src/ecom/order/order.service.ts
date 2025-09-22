import { Inject, Injectable, Logger } from "@nestjs/common";
import { HelperService, OrderEmailData } from "@src/app/helper/helper.service";
import { BaseResponse, BaseService } from "@src/base";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderDetailRepository } from "@src/ecom/order-detail/order-detail.repository";
import OrderPayment from "@src/ecom/order-payment/entities/order-payment.entity";
import { CreateOrderDto } from "@src/ecom/order/dto/create-order.dto";
import { FilterOrderDto } from "@src/ecom/order/dto/order.dto";
import { UpdateOrderDto } from "@src/ecom/order/dto/update-order.dto";
import Order from "@src/ecom/order/entities/order.entity";
import { OrderRepository } from "@src/ecom/order/order.repository";
import { Product } from "@src/ecom/product/entities/product.entity";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class OrderService extends BaseService<Order, OrderRepository> {
    private readonly logger = new Logger(OrderService.name);

    constructor(
        @Inject(OrderRepository)
        private readonly orderRepository: OrderRepository,
        private readonly orderDetailRepository: OrderDetailRepository,
        private sequelize: Sequelize,
        private readonly helperService: HelperService
    ) {
        super(orderRepository);
    }

    generateOrderCode(): string {
        const timestamp = Date.now().toString(); // Lấy thời gian hiện tại dưới dạng chuỗi
        const randomPart = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"); // Tạo một số ngẫu nhiên gồm 6 chữ số
        return `ORD-${timestamp}-${randomPart}`;
    }

    async create(createOrderDto: CreateOrderDto) {
        const order = await this.sequelize.transaction(async (t) => {
            const code = this.generateOrderCode();
            const order = await this.orderRepository.create({ ...createOrderDto, code });
            const orderDetais = [];
            createOrderDto?.orderDetails?.map((item) => {
                orderDetais.push(
                    this.orderDetailRepository.create({
                        ...item,
                        orderId: order.id,
                        product: undefined,
                    })
                );
            });
            await Promise.all(orderDetais);
            return order;
        });

        // Get full order details for email
        const fullOrder = await this.orderRepository.findOne({
            where: { id: order.id },
            include: [
                {
                    model: OrderDetail,
                    as: "orderDetails",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
            ],
        });

        // Prepare email data
        const orderEmailData: OrderEmailData = {
            orderNumber: fullOrder.code,
            items: fullOrder?.orderDetails?.map((detail) => ({
                name: detail?.product?.productName ?? "",
                quantity: detail.quantity,
                price: Number(detail.price ?? 0).toFixed(2),
                color: detail.color ?? "",
                size: detail.size ?? "",
                imageUrl: detail?.product?.image ?? "",
            })),
            subtotal: Number(fullOrder.totalAmount - (fullOrder.shippingAmount ?? 0)).toFixed(2),
            shipping: Number(fullOrder.shippingAmount ?? 0).toFixed(2),
            total: Number(fullOrder.totalAmount ?? 0).toFixed(2),
            shippingAddress: {
                name: `${fullOrder.shippingToFirstName} ${fullOrder.shippingToLastName}`,
                street: fullOrder.shippingToAddress,
                city: fullOrder.shippingToCity,
                state: fullOrder.shippingToState,
                zipCode: fullOrder.shippingToPostCode,
                country: fullOrder.shippingToCountry,
            },
            billingAddress: {
                name: `${fullOrder.firstName} ${fullOrder.lastName}`,
                street: fullOrder.address,
                city: fullOrder.city,
                state: fullOrder.state,
                zipCode: fullOrder.postCode,
                country: fullOrder.country,
            },
            shippingMethod: fullOrder.shippingMethod,
            paymentMethod: {
                type: fullOrder.paymentMethod,
                last4: "****",
                amount: Number(fullOrder.totalAmount || 0).toFixed(2),
            },
        };

        // Send order confirmation email
        try {
            await this.helperService.sendOrderConfirmationEmail(fullOrder.email, orderEmailData);
        } catch (error) {
            this.logger.error(
                "CreateOrder",
                `Failed to send order confirmation email for order #${fullOrder.code}`,
                error
            );
        }

        return await this.findOne(order.id);
    }

    async findAll(filter?: FilterOrderDto): Promise<BaseResponse<Order[]>> {
        const orders = await this.orderRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
            include: ["orderDetails", "orderPayments"],
        });
        const count = await this.orderRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });

        (orders ?? [])?.map((order) => {
            return { ...order, registryId: order?.orderDetails?.[0]?.registryId ?? null };
        });

        return {
            count,
            data: orders,
        };
    }

    async findAllByUserId(userId: number, filter?: FilterOrderDto): Promise<BaseResponse<Order[]>> {
        const orders = await this.orderRepository.find({
            where: {
                userId,
                ...convertFilterWithWhere(filter),
            },
            include: [
                {
                    model: OrderDetail,
                    as: "orderDetails",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
                "orderPayments",
            ],
        });

        const count = await this.orderRepository.count({
            where: {
                userId,
                ...convertFilterWithWhere(filter),
            },
        });

        (orders ?? [])?.map((order) => {
            return { ...order, registryId: order?.orderDetails?.[0]?.registryId ?? null };
        });

        return {
            count,
            data: orders,
        };
    }

    async findOne(id?: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: OrderDetail,
                    as: "orderDetails",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
                {
                    model: OrderPayment,
                    as: "orderPayments",
                    include: [
                        {
                            model: Order,
                            as: "order",
                        },
                    ],
                },
            ],
        });

        return order;
    }

    async findOneMyOrder(id?: number, requesterId?: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                userId: requesterId ?? 1,
            },
            include: [
                {
                    model: OrderDetail,
                    as: "orderDetails",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
                {
                    model: OrderPayment,
                    as: "orderPayments",
                    include: [
                        {
                            model: Order,
                            as: "order",
                        },
                    ],
                },
            ],
        });

        return order;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        await this.orderRepository.updateByIdWithBase(id, updateOrderDto);

        const order = await this.orderRepository.findById(id);

        return this.findOne(order.id);
    }
}
