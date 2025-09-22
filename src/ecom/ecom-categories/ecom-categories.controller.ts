import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { EcomCategoryFilter } from "@src/ecom/ecom-categories/dto/ecom-category.dto";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { CreateEcomCategoryDto } from "./dto/ecom-create-category.dto";
import { UpdateEcomCategoryDto, UpdateEcomCategoryPriority } from "./dto/ecom-update-category.dto";
import { EcomCategoriesService } from "./ecom-categories.service";

@ApiTags("EcomCategories")
@Controller("ecom/categories")
@ApiBearerAuth()
@UseInterceptors(ContextInterceptor)
// @UseInterceptors(ErrorHandlingInterceptor)
export class EcomCategoriesController {
    constructor(private readonly ecomCategoriesService: EcomCategoriesService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createEcomCategoryDto: CreateEcomCategoryDto) {
        return this.ecomCategoriesService.create(createEcomCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: EcomCategoryFilter): Promise<EcomCategory[]> {
        return this.ecomCategoriesService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ecomCategoriesService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateEcomCategoryDto) {
        return this.ecomCategoriesService.update(+id, updateCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ecomCategoriesService.destroy(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id/update-priority")
    updateCategoryByPriority(@Param("id") id: string, @Body() updateCategoryPriority: UpdateEcomCategoryPriority) {
        return this.ecomCategoriesService.updateCategoryByPriority(+id, updateCategoryPriority);
    }
}
