import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { BaseService } from "@src/base";
import { CartDetailRepository } from "@src/ecom/cart-detail/cart-detail.repository";
import { CreateCartDetailDto } from "@src/ecom/cart-detail/dto/cart-detail.dto";
import CartDetail from "@src/ecom/cart-detail/entities/cart-detail.entity";
import { CartRepository } from "@src/ecom/cart/cart.repository";
import { CreateOrUpdateCartDto } from "@src/ecom/cart/dto/create-or-update-cart.dto";
import Cart from "@src/ecom/cart/entities/cart.entity";
import { Color } from "@src/ecom/color/entities/color.entity";
import Product from "@src/ecom/product/entities/product.entity";
import { Size } from "@src/ecom/size/entities/size.entity";
import { HandleError } from "@src/utils";
import { omit } from "lodash";
import { isNilOrEmpty, isNotNilOrEmpty } from "ramda-adjunct";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CartService extends BaseService<Cart, CartRepository> {
    constructor(
        @Inject(CartRepository)
        private readonly cartRepository: CartRepository,
        private readonly cartDetailRepository: CartDetailRepository,
        private sequelize: Sequelize
    ) {
        super(cartRepository);
    }

    async createOrUpdate(createOrUpdateCartDto: CreateOrUpdateCartDto, userId: number) {
        const cart = await this.cartRepository.findOne({
            where: {
                userId: userId,
            },
            include: ["cartDetails"],
        });
        const result = await this.sequelize.transaction(async (t) => {
            if (!cart) {
                // add cart
                const newCart = await this.cartRepository.create(
                    {
                        userId,
                        totalQuantity: createOrUpdateCartDto?.totalQuantity,
                        giftCode: createOrUpdateCartDto?.giftCode,
                        note: createOrUpdateCartDto?.note,
                    },
                    t
                );

                const cartDetails = [];
                createOrUpdateCartDto?.cartDetails?.map((item) => {
                    cartDetails.push(
                        this.cartDetailRepository.create(
                            {
                                cartId: newCart.id,
                                ...item,
                            },
                            t
                        )
                    );
                }),
                    await Promise.all(cartDetails);

                return await this.cartRepository.findById(newCart.id, {
                    include: ["cartDetails"],
                });
            } else {
                // update cart
                await this.cartRepository.updateByIdWithBase(
                    cart.id,
                    {
                        ...omit(createOrUpdateCartDto, ["cartDetails"]),
                    },
                    t
                );

                if (isNotNilOrEmpty(createOrUpdateCartDto?.cartDetails)) {
                    const cartDetailDelete = [];
                    cart?.cartDetails?.map((item) => {
                        cartDetailDelete.push(this.cartDetailRepository.forceDelete(item?.id, t));
                    }),
                        await Promise.all(cartDetailDelete);
                    const cartDetails = [];
                    createOrUpdateCartDto?.cartDetails?.map((item) => {
                        cartDetails.push(
                            this.cartDetailRepository.create(
                                {
                                    cartId: cart.id,
                                    ...item,
                                },
                                t
                            )
                        );
                    }),
                        await Promise.all(cartDetails);
                }

                return await this.cartRepository.findById(cart.id, {
                    include: ["cartDetails"],
                });
            }
        });
        await this.updateCartTotalQuantity(result.id);
        return result;
    }

    async addCartDetail(createCartDetailDto: CreateCartDetailDto, userId: number) {
        try {
            const cart = await this.cartRepository.findOne({
                where: {
                    userId: userId,
                },
                include: ["cartDetails"],
            });
            if (!cart) {
                const newCart = await this.cartRepository.create({
                    userId,
                });

                if (newCart) {
                    await this.cartDetailRepository.create({
                        cartId: newCart.id,
                        ...createCartDetailDto,
                    });

                    const result = await this.cartRepository.findById(newCart.id, {
                        include: ["cartDetails"],
                    });
                    await this.updateCartTotalQuantity(result?.id);

                    return result;
                }
            } else {
                if (isNilOrEmpty(cart.cartDetails)) {
                    await this.cartDetailRepository.create({
                        cartId: cart.id,
                        ...createCartDetailDto,
                    });
                    const result = await this.cartRepository.findById(cart.id, {
                        include: ["cartDetails"],
                    });
                    await this.updateCartTotalQuantity(result?.id);

                    return result;
                } else {
                    const orderDetailSame = cart.cartDetails?.find(
                        (item) =>
                            Number(item?.colorId) === Number(createCartDetailDto?.colorId) &&
                            Number(item?.sizeId) === Number(createCartDetailDto?.sizeId) &&
                            Number(item.productId) === Number(createCartDetailDto?.productId)
                    );
                    if (orderDetailSame) {
                        // delete old cart details
                        const cartDetailDelete = cart?.cartDetails?.map((item) => {
                            return this.cartDetailRepository.forceDelete(Number(item?.id));
                        });
                        await Promise.all(cartDetailDelete);

                        // Gộp số lượng nếu co item trùng lặp
                        const newCartDetails = cart.cartDetails.map((item) => {
                            const data = {
                                colorId: item.colorId,
                                sizeId: item.sizeId,
                                productId: item.productId,
                                quantity: item.quantity,
                            };

                            if (item.id === orderDetailSame.id) {
                                data.quantity = Number(item.quantity || 0) + Number(createCartDetailDto.quantity || 0);
                            }

                            return this.cartDetailRepository.create({
                                cartId: cart.id,
                                ...data,
                            });
                        });

                        // add new cart details
                        await Promise.all(newCartDetails);
                        const result = await this.cartRepository.findById(cart.id, {
                            include: ["cartDetails"],
                        });
                        await this.updateCartTotalQuantity(result?.id);
                        return result;
                    } else {
                        await this.cartDetailRepository.create({
                            cartId: cart.id,
                            ...createCartDetailDto,
                        });
                        const result = await this.cartRepository.findById(cart.id, {
                            include: ["cartDetails"],
                        });
                        await this.updateCartTotalQuantity(result?.id);

                        return result;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async updateCartDetail(cartDetailDto: CreateCartDetailDto, cartDetailId: number, userId: number) {
        const cartDetail = await this.cartDetailRepository.findOne({
            where: {
                id: cartDetailId,
            },
        });

        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                id: cartDetail.cartId,
            },
        });

        if (!cartDetail || !cart) {
            HandleError("Cart detail not found", HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        await this.cartDetailRepository.updateByIdWithBase(cartDetailId, cartDetailDto);
        await this.updateCartTotalQuantity(cart.id);
        return await this.cartDetailRepository.findOne({
            where: {
                id: cartDetailId,
            },
        });
    }

    async getCart(userId: number) {
        try {
            const cart = await this.cartRepository.findOne({
                where: {
                    userId,
                },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        separate: true,
                        order: [["createdAt", "DESC"]],
                        model: CartDetail,
                        as: "cartDetails",
                        include: [
                            {
                                model: Color,
                                as: "color",
                            },
                            {
                                model: Size,
                                as: "size",
                            },
                            {
                                model: Product,
                                as: "product",
                            },
                        ],
                    },
                ],
            });
            if (!cart) {
                return null;
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async resetCart(userId: number) {
        return await this.sequelize.transaction(async (t) => {
            const cart = await this.cartRepository.findOne({
                where: {
                    userId: userId,
                },
                include: ["cartDetails"],
            });

            await this.cartRepository.updateByIdWithBase(
                cart.id,
                {
                    totalQuantity: null,
                    giftCode: null,
                    note: null,
                },
                t
            );

            const cartDetailDelete = [];
            cart?.cartDetails?.map((item) => {
                cartDetailDelete.push(this.cartDetailRepository.forceDelete(item?.id, t));
            }),
                await Promise.all(cartDetailDelete);

            return true;
        });
    }

    async updateCartTotalQuantity(cartId: number) {
        const cart = await this.cartRepository.findOne({
            where: {
                id: cartId,
            },
            include: ["cartDetails"],
        });
        const totalQuantity = cart?.cartDetails?.length
            ? cart.cartDetails.reduce((preV, current) => {
                  const quantity = Number(current.quantity || 0);
                  return preV + (isNaN(quantity) ? 0 : quantity);
              }, 0)
            : 0;
        await this.cartRepository.updateByIdWithBase(cartId, {
            totalQuantity: totalQuantity,
        });
        return true;
    }

    async deleteCartDetail(userId: number, cartDetailId: number) {
        const cartDetail = await this.cartDetailRepository.findOne({
            where: {
                id: cartDetailId,
            },
        });

        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                id: cartDetail.cartId,
            },
        });

        if (!cartDetail || !cart) {
            HandleError("Cart detail not found", HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        this.cartDetailRepository.forceDelete(Number(cartDetailId));
        await this.updateCartTotalQuantity(cart.id);
        return await this.cartDetailRepository.findOne({
            where: {
                id: cartDetailId,
            },
        });
    }
}
