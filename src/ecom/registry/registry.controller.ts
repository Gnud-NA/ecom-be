import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { BaseDeletedResponse, BaseResponse, BaseUpdatedResponse, RequestWithAuth } from "@src/base";
import { CreateRegistryDto } from "@src/ecom/registry/dto/create-registry.dto";
import { RegistryFilter } from "@src/ecom/registry/dto/registry.dto";
import { UpdateRegistryDto } from "@src/ecom/registry/dto/update-registry.dto";
import Registry from "@src/ecom/registry/entities/registry.entity";
import { RegistryService } from "@src/ecom/registry/registry.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/registries")
@ApiTags("Registry")
@UseInterceptors(ContextInterceptor)
export class RegistryController {
    constructor(private readonly registryService: RegistryService) {}

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post()
    create(@Body() createRegistryDto: CreateRegistryDto, @Req() req: RequestWithAuth) {
        return this.registryService.createRegistry(createRegistryDto, req.auth.userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateRegistryDto: UpdateRegistryDto
    ): Promise<BaseUpdatedResponse<Registry>> {
        return this.registryService.update(+id, updateRegistryDto);
    }

    @ApiOkResponse({
        description: "The Registry records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(Registry),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Query() request: RegistryFilter): Promise<BaseResponse<Registry[]>> {
        return this.registryService.findAll(request);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get(":registryId/existing-items")
    async getExistingItems(
        @Req() req: RequestWithAuth,
        @Param("registryId") registryId: number
    ): Promise<BaseResponse<{ productId: number; colorId: number; sizeId: number }[]>> {
        const userId = req.auth.userId;
        return await this.registryService.getExistingItems(userId, registryId);
    }

    @ApiOkResponse({
        description: "The Registry records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(Registry),
                    },
                },
            },
        },
    })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get("my-registries")
    findAllPrivate(@Req() req: RequestWithAuth, @Query() request: RegistryFilter): Promise<BaseResponse<Registry[]>> {
        return this.registryService.findAll(request, req.auth.userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get(":id")
    findOne(@Param("id") id: string, @Req() req: RequestWithAuth) {
        return this.registryService.findOneRegistry(+id, req.auth.userId);
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Delete(":id")
    remove(@Param("id") id: string, @Req() req: RequestWithAuth): Promise<BaseDeletedResponse> {
        return this.registryService.deleteRegistry(+id, req.auth.userId);
    }
}
