import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { UpdateCategoryDto } from "@src/app/categories/dto/update-category.dto";
import { MenuFilter } from "@src/app/menu/dto/menu.dto";
import Menu from "@src/app/menu/entities/menu.entity";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { MenuService } from "./menu.service";

@ApiTags("Menu")
@ApiBearerAuth()
@Controller("menu")
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: MenuFilter): Promise<Menu[]> {
        return this.menuService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.menuService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() request: UpdateCategoryDto) {
        return this.menuService.update(+id, request);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.menuService.remove(+id);
    }
}
