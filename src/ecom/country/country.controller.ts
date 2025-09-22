import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { BaseResponse } from "@src/base";
import { FilterCountryDto } from "@src/ecom/country/dto/country.dto";
import { UpdateCountryDto } from "@src/ecom/country/dto/update-country.dto";
import { Country as CountryEntity } from "@src/ecom/country/entities/country.entity";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";

@ApiTags("Country")
@ApiBearerAuth()
@Controller("countries")
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createCountryDto: CreateCountryDto) {
        return this.countryService.create(createCountryDto);
    }

    @ApiOkResponse({
        description: "The Country records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(CountryEntity),
                    },
                },
            },
        },
    })
    @Get()
    // @UseGuards(AdminGuard)
    findAll(@Query() filter?: FilterCountryDto): Promise<BaseResponse<CountryEntity[]>> {
        return this.countryService.findAll(filter);
    }

    @ApiOkResponse({
        description: "The Country records",
        schema: {
            $ref: getSchemaPath(CountryEntity),
        },
    })
    @Get(":id")
    // @UseGuards(AdminGuard)
    findOne(@Param("id") id: string) {
        return this.countryService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCountryDto: UpdateCountryDto) {
        return this.countryService.update(+id, updateCountryDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.countryService.remove(+id);
    }

    @UseGuards(AdminGuard)
    @Delete(":id/force-delete")
    destroy(@Param("id") id: string) {
        return this.countryService.destroy(+id);
    }
}
