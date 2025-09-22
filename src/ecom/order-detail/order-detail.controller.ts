import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterOrderDetailDto } from "@src/ecom/order-detail/dto/order-detail.dto";
import { UpdateOrderDetailDto } from "@src/ecom/order-detail/dto/update-order-detail.dto";
import { OrderDetail as OrderDetailEntity } from "@src/ecom/order-detail/entities/order-detail.entity";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { OrderDetailService } from "./order-detail.service";

@ApiTags("Ecom OrderDetail")
@ApiBearerAuth()
@Controller("order-details")
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
        return this.orderDetailService.create(createOrderDetailDto);
    }

    @ApiOkResponse({
        description: "The OrderDetail records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(OrderDetailEntity),
                    },
                },
            },
        },
    })
    @Get()
    @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterOrderDetailDto): Promise<BaseResponse<OrderDetailEntity[]>> {
        return this.orderDetailService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The OrderDetail records",
        schema: {
            $ref: getSchemaPath(OrderDetailEntity),
        },
    })
    @Get(":id")
    @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.orderDetailService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
        return this.orderDetailService.update(+id, updateOrderDetailDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.orderDetailService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.orderDetailService.destroy(+id);
    }
}
