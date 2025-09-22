import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { MenuDetailFilter } from "@src/app/menu-detail/dto/menu-detail.dto";
import MenuDetail from "@src/app/menu-detail/entities/menu-detail.entity";
import { CreateMenuDetailDto } from "./dto/create-menu-detail.dto";
import { UpdateMenuDetailDto, UpdateMenuDetailPriority } from "./dto/update-menu-detail.dto";
import { MenuDetailService } from "./menu-detail.service";

@ApiTags("MenuDetail")
@ApiBearerAuth()
@Controller("menu-details")
// @UseInterceptors(ErrorHandlingInterceptor)
export class MenuDetailController {
    constructor(private readonly menuDetailsService: MenuDetailService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createMenuDetailDto: CreateMenuDetailDto) {
        return this.menuDetailsService.create(createMenuDetailDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: MenuDetailFilter): Promise<MenuDetail[]> {
        return this.menuDetailsService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.menuDetailsService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateMenuDetailDto: UpdateMenuDetailDto) {
        return this.menuDetailsService.update(+id, updateMenuDetailDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.menuDetailsService.destroy(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id/update-priority")
    updateMenuDetailByPriority(@Param("id") id: string, @Body() updateMenuDetailPriority: UpdateMenuDetailPriority) {
        return this.menuDetailsService.updateMenuDetailByPriority(+id, updateMenuDetailPriority);
    }
}
