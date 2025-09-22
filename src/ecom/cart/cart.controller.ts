import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { RequestWithAuth } from "@src/base";
import { CreateCartDetailDto } from "@src/ecom/cart-detail/dto/cart-detail.dto";
import { CartService } from "@src/ecom/cart/cart.service";
import { CreateOrUpdateCartDto } from "@src/ecom/cart/dto/create-or-update-cart.dto";
import Cart from "@src/ecom/cart/entities/cart.entity";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@ApiTags("Cart")
@ApiBearerAuth()
@Controller("ecom/carts")
@UseInterceptors(ContextInterceptor)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(UserGuard)
    @Patch()
    createOrUpdate(@Body() createOrUpdateCartDto: CreateOrUpdateCartDto, @Req() req: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.cartService.createOrUpdate(createOrUpdateCartDto, userId);
    }

    @UseGuards(UserGuard)
    @Post("/add-cart-detail")
    @ApiOkResponse({
        description: "add cart detail response",
        schema: {
            $ref: getSchemaPath(Cart),
        },
    })
    addCartDetail(@Body() createCartDetailDto: CreateCartDetailDto, @Req() req: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.cartService.addCartDetail(createCartDetailDto, userId);
    }

    @UseGuards(UserGuard)
    @Patch("/update-cart-detail/:id")
    @ApiOkResponse({
        description: "update cart detail response",
        schema: {
            $ref: getSchemaPath(Cart),
        },
    })
    updateCartDetail(@Body() artDetailDto: CreateCartDetailDto, @Req() req: RequestWithAuth, @Param("id") id: string) {
        const userId = req?.auth?.userId;
        return this.cartService.updateCartDetail(artDetailDto, +id, userId);
    }

    @UseGuards(UserGuard)
    @ApiOkResponse({
        description: "Your Cart",
        schema: {
            $ref: getSchemaPath(Cart),
        },
    })
    @Get()
    getCart(@Req() req: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.cartService.getCart(userId);
    }

    @UseGuards(UserGuard)
    @Patch("/reset")
    @ApiOkResponse({
        description: "reset cart status",
        schema: {
            type: "boolean",
            example: true,
        },
    })
    update(@Req() req: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.cartService.resetCart(userId);
    }

    @UseGuards(UserGuard)
    @Delete("/cart-detail/:id")
    @ApiOkResponse({
        description: "reset cart status",
        schema: {
            type: "boolean",
            example: true,
        },
    })
    deleteCartDetail(@Req() req: RequestWithAuth, @Param("id") id: string) {
        const userId = req?.auth?.userId;
        return this.cartService.deleteCartDetail(userId, +id);
    }
}
