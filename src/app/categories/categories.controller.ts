import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { CategoryFilter } from "@src/app/categories/dto/category.dto";
import Category from "@src/app/categories/entities/category.entity";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto, UpdateCategoryPriority } from "./dto/update-category.dto";

@ApiTags("Categories")
@Controller("categories")
@ApiBearerAuth()
@UseInterceptors(ContextInterceptor)
// @UseInterceptors(ErrorHandlingInterceptor)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: CategoryFilter): Promise<Category[]> {
        return this.categoriesService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.categoriesService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.categoriesService.destroy(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id/update-priority")
    updateCategoryByPriority(@Param("id") id: string, @Body() updateCategoryPriority: UpdateCategoryPriority) {
        return this.categoriesService.updateCategoryByPriority(+id, updateCategoryPriority);
    }
}
