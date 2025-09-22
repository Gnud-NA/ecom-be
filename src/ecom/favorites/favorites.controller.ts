import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { BaseDeletedResponse, BaseResponse, RequestWithAuth } from "@src/base";
import { CreateFavoritesDto } from "@src/ecom/favorites/dto/create-favorites.dto";
import { FavoritesFilter } from "@src/ecom/favorites/dto/favorites.dto";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import { FavoritesService } from "@src/ecom/favorites/favorites.service";
import { ContextInterceptor } from "@src/validates/request.interceptor";

@Controller("ecom/my-favorites")
@ApiTags("My Favorites")
@ApiBearerAuth()
@UseGuards(UserGuard)
@UseInterceptors(ContextInterceptor)
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    create(@Body() createFavoritesDto: CreateFavoritesDto, @Req() req: RequestWithAuth) {
        return this.favoritesService.create(createFavoritesDto, req.auth.userId);
    }

    @ApiOkResponse({
        description: "The my favorites records",
        schema: {
            type: "object",
            properties: {
                count: {
                    type: "number",
                },
                data: {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(Favorites),
                    },
                },
            },
        },
    })
    @Get()
    findAll(@Req() req: RequestWithAuth, @Query() request: FavoritesFilter): Promise<BaseResponse<Favorites[]>> {
        return this.favoritesService.findAll(request, req.auth.userId);
    }

    @Delete(":id")
    remove(@Param("id") id: string, @Req() req: RequestWithAuth): Promise<BaseDeletedResponse> {
        return this.favoritesService.delete(+id, req.auth.userId);
    }
}
