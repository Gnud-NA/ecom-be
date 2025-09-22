import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { UserGuard } from "@src/app/auth/user.guard";
import { BaseResponse, RequestWithAuth } from "@src/base";
import { FilterOrderDto } from "@src/ecom/order/dto/order.dto";
import { UpdateOrderDto } from "@src/ecom/order/dto/update-order.dto";
import { Order as OrderEntity } from "@src/ecom/order/entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@ApiTags("Order")
@ApiBearerAuth()
@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    // @UseGuards(UserGuard)
    // @UseGuards(AdminGuard)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto, @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId ?? 1;
        return this.orderService.create({ ...createOrderDto, userId: 1 });
    }

    @ApiOkResponse({
        description: "The Order records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(OrderEntity),
                    },
                },
            },
        },
    })
    @Get()
    @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterOrderDto): Promise<BaseResponse<OrderEntity[]>> {
        return this.orderService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The Order records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(OrderEntity),
                    },
                },
            },
        },
    })
    @UseGuards(UserGuard)
    @Get("my-orders")
    findAllByUserId(@Query() filter?: FilterOrderDto, @Req() request?: RequestWithAuth) {
        const userId = request?.auth?.userId ?? 1;
        console.log(userId, "userId");
        return this.orderService.findAllByUserId(userId, filter);
    }

    @ApiOkResponse({
        description: "The Order records",
        schema: {
            $ref: getSchemaPath(OrderEntity),
        },
    })
    @Get("my-orders/:id")
    @UseGuards(UserGuard)
    findOneMyOrder(@Param("id") id: string, @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId ?? 1;
        return this.orderService.findOneMyOrder(+id, userId);
    }

    @ApiOkResponse({
        description: "The Order records",
        schema: {
            $ref: getSchemaPath(OrderEntity),
        },
    })
    @Get(":id")
    @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.orderService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.orderService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.orderService.destroy(+id);
    }
}
