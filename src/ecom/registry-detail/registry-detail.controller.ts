import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { BaseDeletedResponse, BaseResponse, RequestWithAuth } from "@src/base";
import { CreateRegistryDetailDto } from "@src/ecom/registry-detail/dto/create-registry-detail.dto";
import { RegistryDetailFilter } from "@src/ecom/registry-detail/dto/registry-detail.dto";
import RegistryDetail from "@src/ecom/registry-detail/entities/registry-detail.entity";
import { RegistryDetailService } from "@src/ecom/registry-detail/registry-detail.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/registry-detail")
@ApiTags("Registry Detail")
@UseInterceptors(ContextInterceptor)
export class RegistryDetailController {
    constructor(private readonly registryDetailService: RegistryDetailService) {}

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post()
    create(@Body() createRegistryDetailDto: CreateRegistryDetailDto) {
        return this.registryDetailService.create(createRegistryDetailDto);
    }

    @ApiOkResponse({
        description: "The Registry Detail records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(RegistryDetail),
                    },
                },
            },
        },
    })
    @Get()
    findAll(
        @Req() req: RequestWithAuth,
        @Query() request: RegistryDetailFilter
    ): Promise<BaseResponse<RegistryDetail[]>> {
        return this.registryDetailService.findAll(request, req?.auth?.userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @ApiOkResponse({
        description: "The Registry Detail records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(RegistryDetail),
                    },
                },
            },
        },
    })
    @Get("/me")
    findAllMyRegistryDetail(
        @Req() req: RequestWithAuth,
        @Query() request: RegistryDetailFilter
    ): Promise<BaseResponse<RegistryDetail[]>> {
        return this.registryDetailService.findAll(request, req.auth.userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Delete(":id")
    remove(@Param("id") id: string, @Req() req: RequestWithAuth): Promise<BaseDeletedResponse> {
        return this.registryDetailService.delete(+id, req.auth.userId);
    }
}
