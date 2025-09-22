import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterSizeDto } from "@src/ecom/size/dto/size.dto";
import { UpdateSizeDto } from "@src/ecom/size/dto/update-size.dto";
import { Size as SizeEntity } from "@src/ecom/size/entities/size.entity";
import { CreateSizeDto } from "./dto/create-size.dto";
import { SizeService } from "./size.service";

@ApiTags("Ecom Size")
@ApiBearerAuth()
@Controller("ecom/sizes")
export class SizeController {
    constructor(private readonly sizeService: SizeService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createSizeDto: CreateSizeDto) {
        return this.sizeService.create(createSizeDto);
    }

    @ApiOkResponse({
        description: "The Size records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(SizeEntity),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() filter?: FilterSizeDto): Promise<BaseResponse<SizeEntity[]>> {
        return this.sizeService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The Size records",
        schema: {
            $ref: getSchemaPath(SizeEntity),
        },
    })
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.sizeService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateSizeDto: UpdateSizeDto) {
        return this.sizeService.update(+id, updateSizeDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.sizeService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.sizeService.destroy(+id);
    }
}
