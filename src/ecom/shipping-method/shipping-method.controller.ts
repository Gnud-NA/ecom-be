import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterShippingMethodDto } from "@src/ecom/shipping-method/dto/shipping-method.dto";
import { UpdateShippingMethodDto } from "@src/ecom/shipping-method/dto/update-shipping-method.dto";
import { ShippingMethod as ShippingMethodEntity } from "@src/ecom/shipping-method/entities/shipping-method.entity";
import { CreateShippingMethodDto } from "./dto/create-shipping-method.dto";
import { ShippingMethodService } from "./shipping-method.service";

@ApiTags("ShippingMethod")
@ApiBearerAuth()
@Controller("shipping-methods")
export class ShippingMethodController {
    constructor(private readonly shippingMethodService: ShippingMethodService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
        return this.shippingMethodService.create(createShippingMethodDto);
    }

    @ApiOkResponse({
        description: "The ShippingMethod records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(ShippingMethodEntity),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() filter?: FilterShippingMethodDto): Promise<BaseResponse<ShippingMethodEntity[]>> {
        return this.shippingMethodService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The ShippingMethod records",
        schema: {
            $ref: getSchemaPath(ShippingMethodEntity),
        },
    })
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.shippingMethodService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateShippingMethodDto: UpdateShippingMethodDto) {
        return this.shippingMethodService.update(+id, updateShippingMethodDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.shippingMethodService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.shippingMethodService.destroy(+id);
    }
}
