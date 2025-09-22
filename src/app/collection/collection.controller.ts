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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { CollectionFilter } from "@src/app/collection/dto/collection.dto";
import Collection from "@src/app/collection/entities/collection.entity";
import { RequestWithAuth } from "@src/base";
import { insertIfObject } from "@src/utils";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@ApiTags("Collections")
@Controller("collections")
@ApiBearerAuth()
@UseInterceptors(ContextInterceptor)
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createCollectionDto: CreateCollectionDto, @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;
        return this.collectionService.create({
            ...createCollectionDto,
            ...insertIfObject(!createCollectionDto?.userId, { userId }),
        });
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: CollectionFilter): Promise<Collection[]> {
        return this.collectionService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.collectionService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCollectionDto) {
        return this.collectionService.update(+id, updateCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.collectionService.destroy(+id);
    }
}
