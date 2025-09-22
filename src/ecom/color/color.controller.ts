import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterColorDto } from "@src/ecom/color/dto/color.dto";
import { UpdateColorDto } from "@src/ecom/color/dto/update-color.dto";
import { Color as ColorEntity } from "@src/ecom/color/entities/color.entity";
import { ColorService } from "./color.service";
import { CreateColorDto } from "./dto/create-color.dto";

@ApiTags("Color")
@ApiBearerAuth()
@Controller("ecom/colors")
export class ColorController {
    constructor(private readonly colorService: ColorService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createColorDto: CreateColorDto) {
        return this.colorService.create(createColorDto);
    }

    @ApiOkResponse({
        description: "The Color records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(ColorEntity),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() filter?: FilterColorDto): Promise<BaseResponse<ColorEntity[]>> {
        return this.colorService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The Color records",
        schema: {
            $ref: getSchemaPath(ColorEntity),
        },
    })
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.colorService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateColorDto: UpdateColorDto) {
        return this.colorService.update(+id, updateColorDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.colorService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.colorService.destroy(+id);
    }
}
