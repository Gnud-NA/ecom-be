import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { UpdateVoucherDto } from "@src/ecom/voucher/dto/update-voucher.dto";
import { FilterVoucherDto } from "@src/ecom/voucher/dto/voucher.dto";
import { Voucher as VoucherEntity } from "@src/ecom/voucher/entities/voucher.entity";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { VoucherService } from "./voucher.service";

@ApiTags("Voucher")
@ApiBearerAuth()
@Controller("vouchers")
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createVoucherDto: CreateVoucherDto) {
        return this.voucherService.create(createVoucherDto);
    }

    @ApiOkResponse({
        description: "The Voucher records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(VoucherEntity),
                    },
                },
            },
        },
    })
    @Get()
    // @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterVoucherDto): Promise<BaseResponse<VoucherEntity[]>> {
        return this.voucherService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The Voucher records",
        schema: {
            $ref: getSchemaPath(VoucherEntity),
        },
    })
    @Get(":id")
    @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.voucherService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
        return this.voucherService.update(+id, updateVoucherDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.voucherService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.voucherService.destroy(+id);
    }
}
