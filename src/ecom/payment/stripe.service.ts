import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { HelperService, OrderEmailData } from "@src/app/helper/helper.service";
import User from "@src/app/users/entities/user.entity";
import { RequestWithAuth } from "@src/base";
import { CurrencyEnum, OrderPaymentMethodEnum, OrderPaymentStatusEnum } from "@src/config";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import { OrderPaymentRepository } from "@src/ecom/order-payment/order-payment.repository";
import { OrderRepository } from "@src/ecom/order/order.repository";
import Product from "@src/ecom/product/entities/product.entity";
import { UserBankCard } from "@src/ecom/user-bank-card/entities/user-bank-card.entity";
import { HandleError, insertIfObject } from "@src/utils";
import { Repository } from "sequelize-typescript";
import Stripe from "stripe";
import {
    StripeCreateCustomerDto,
    StripeCreateIntentDto,
    StripePaymentWithSavedCardDto,
    StripeSetupIntentNewCustomerResponseDto,
} from "./dto/payment.dto";

@Injectable()
export class StripeService {
    private stripe: Stripe;
    constructor(
        private configService: ConfigService,
        private readonly orderPaymentRepository: OrderPaymentRepository,
        private readonly orderRepository: OrderRepository,
        private readonly helperService: HelperService,
        private readonly logger: Logger,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserBankCard)
        private readonly userBankCardRepository: Repository<UserBankCard>
    ) {
        // private readonly mediaRepository: MediaRepository // @Inject(MediaRepository) // private sequelize: Sequelize, // private readonly productRepository: ProductRepository, // @Inject(ProductRepository)
        this.stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"), {
            apiVersion: this.configService.get("STRIPE_VERSION"),
        });
    }

    async createCustomer(request: RequestWithAuth, stripeCreateCustomerDto: StripeCreateCustomerDto) {
        const customer = await this.stripe.customers.create({
            email: request.auth.email,
            payment_method: stripeCreateCustomerDto.paymentMethodId,
            metadata: {
                userId: request.auth.userId,
            },
        });

        return customer;
    }

    async createPaymentIntent(stripeCreateIntentDto: StripeCreateIntentDto) {
        const { amount, currency, customerId, paymentMethodId, confirm, offSession, orderId, orderCode } =
            stripeCreateIntentDto;
        console.log(stripeCreateIntentDto, "stripeCreateIntentDto");

        return this.stripe.paymentIntents.create({
            customer: customerId,
            amount,
            currency: currency ?? CurrencyEnum.USD,
            ...insertIfObject(paymentMethodId, { payment_method: paymentMethodId }),
            confirm,
            off_session: offSession,
            metadata: {
                orderId: orderId,
                orderCode: orderCode,
            },
        });
    }

    async callbackPaymentIntent(request: RequestWithAuth) {
        const sig = request.headers["stripe-signature"];
        let event;

        try {
            event = this.stripe.webhooks.constructEvent(
                request.body,
                sig,
                this.configService.get("STRIPE_CALLBACK_SECRET")
            );
        } catch (err) {
            console.log(err);
            HandleError("Unhandled event type", 400, 400, null);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.amount_capturable_updated":
                await this.orderPaymentRepository.create({
                    orderId: Number(event?.data?.object?.metadata?.orderId),
                    metadata: JSON.stringify(event),
                    paymentMethod: OrderPaymentMethodEnum.CREDIT_CARD,
                    paymentStatus: OrderPaymentStatusEnum.SUCCESS_UPDATE,
                });
                break;
            case "payment_intent.canceled":
                await this.orderPaymentRepository.create({
                    orderId: Number(event?.data?.object?.metadata?.orderId),
                    metadata: JSON.stringify(event),
                    paymentMethod: OrderPaymentMethodEnum.CREDIT_CARD,
                    paymentStatus: OrderPaymentStatusEnum.CANCELED,
                });
                break;
            case "payment_intent.created":
                const paymentIntentCreated = event.data.object;
                // Then define and call a function to handle the event payment_intent.created
                break;
            case "payment_intent.payment_failed":
                await this.orderPaymentRepository.create({
                    orderId: Number(event?.data?.object?.metadata?.orderId),
                    metadata: JSON.stringify(event),
                    paymentMethod: OrderPaymentMethodEnum.CREDIT_CARD,
                    paymentStatus: OrderPaymentStatusEnum.FAILED,
                });
                // Then define and call a function to handle the event payment_intent.payment_failed
                break;
            case "payment_intent.processing":
                await this.orderPaymentRepository.create({
                    orderId: Number(event?.data?.object?.metadata?.orderId),
                    metadata: JSON.stringify(event),
                    paymentMethod: OrderPaymentMethodEnum.CREDIT_CARD,
                    paymentStatus: OrderPaymentStatusEnum.PROCCESSING,
                });
                break;
            case "payment_intent.requires_action":
                const paymentIntentRequiresAction = event.data.object;
                // Then define and call a function to handle the event payment_intent.requires_action
                break;
            case "payment_intent.succeeded":
                const orderId = Number(event?.data?.object?.metadata?.orderId);

                // Create payment record
                await this.orderPaymentRepository.create({
                    orderId: orderId,
                    metadata: JSON.stringify(event),
                    paymentMethod: OrderPaymentMethodEnum.CREDIT_CARD,
                    paymentStatus: OrderPaymentStatusEnum.SUCCESS,
                });

                // Get order details with all necessary relations
                const order = await this.orderRepository.findOne({
                    where: { id: orderId },
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

                if (!order) {
                    throw new Error(`Order not found: ${orderId}`);
                }

                // Prepare email data
                const orderEmailData: OrderEmailData = {
                    orderNumber: order.code,
                    items: order.orderDetails.map((detail: OrderDetail) => ({
                        name: detail.product.productName,
                        quantity: detail.quantity,
                        price: Number(detail.price).toFixed(2),
                        color: detail.color,
                        size: detail.size,
                        imageUrl: detail.product.image,
                    })),
                    subtotal: Number(order.totalAmount - (order.shippingAmount || 0)).toFixed(2),
                    shipping: Number(order.shippingAmount || 0).toFixed(2),
                    total: Number(order.totalAmount).toFixed(2),
                    shippingAddress: {
                        name: `${order.shippingToFirstName} ${order.shippingToLastName}`,
                        street: order.shippingToAddress,
                        city: order.shippingToCity,
                        state: order.shippingToState,
                        zipCode: order.shippingToPostCode,
                        country: order.shippingToCountry,
                    },
                    billingAddress: {
                        name: `${order.firstName} ${order.lastName}`,
                        street: order.address,
                        city: order.city,
                        state: order.state,
                        zipCode: order.postCode,
                        country: order.country,
                    },
                    shippingMethod: order.shippingMethod,
                    paymentMethod: {
                        type: "credit_card",
                        last4: event.data.object.payment_method_details?.card?.last4 || "****",
                        amount: Number(order.totalAmount).toFixed(2),
                    },
                };

                // Send confirmation email
                try {
                    await this.helperService.sendOrderConfirmationEmail(
                        order.email || order.user.email,
                        orderEmailData
                    );
                } catch (error) {
                    this.logger.error(
                        "StripeWebhook",
                        `Failed to send order confirmation email for order #${order.code}`,
                        error
                    );
                    // Don't throw error here as payment was successful
                }
                break;
            default:
                console.log(`Not support event type ${event.type}`);
                HandleError("Not support event type", 400, 400, null);
        }
    }

    async setupIntentNewCustomer(request: RequestWithAuth): Promise<StripeSetupIntentNewCustomerResponseDto> {
        try {
            const user = await this.userRepository.findByPk(request.auth.userId);
            let paymentCustomerId = user?.paymentCustomerId;
            if (!paymentCustomerId) {
                const customer = await this.stripe.customers.create({
                    email: request.auth.email,
                    metadata: {
                        userId: request.auth.userId,
                    },
                });

                if (!customer) {
                    throw new Error("Failed to create customer");
                }
                paymentCustomerId = customer.id;
            }

            const setupIntentsRes = await this.stripe.setupIntents.create({
                customer: paymentCustomerId,
            });

            if (!setupIntentsRes) {
                throw new Error("Failed to create setup intents");
            }

            // setupIntents success, update user paymentCustomerId
            this.userRepository.update(
                {
                    paymentCustomerId: paymentCustomerId,
                },
                {
                    where: {
                        id: request.auth.userId,
                    },
                }
            );

            return {
                clientSecret: setupIntentsRes?.client_secret,
            };
        } catch (error) {
            throw new Error("Failed to create setup intents");
        }
    }

    async deletePaymentMethod(paymentMethodId: string) {
        try {
            await this.stripe.paymentMethods.detach(paymentMethodId);
            return true;
        } catch (error) {
            // not throw error here because it will be deleted or not exist from stripe
        }
    }

    async paymentWithSavedCard(params: StripePaymentWithSavedCardDto, request: RequestWithAuth) {
        const user = await this.userRepository.findByPk(request.auth.userId);
        const paymentCustomerId = user?.paymentCustomerId;
        if (!paymentCustomerId) {
            throw new Error("Customer not found");
        }

        const userBankCard = await this.userBankCardRepository.findByPk(params.userBankCardId);
        if (!userBankCard) {
            throw new Error("Payment method not found");
        }

        return await this.createPaymentIntent({
            ...params,
            customerId: paymentCustomerId,
            paymentMethodId: userBankCard?.paymentMethodId,
        });
    }
}
