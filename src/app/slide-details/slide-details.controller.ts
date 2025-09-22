import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { CreateSlideDetailDto } from "@src/app/slide-details/dto/create-slide-detail.dto";
import { SlideDetailFilter } from "@src/app/slide-details/dto/slide-detail.dto";
import { UpdateSlideDetailDto } from "@src/app/slide-details/dto/update-slide-detail.dto";
import SlideDetail from "@src/app/slide-details/entities/slide-detail.entity";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { SlideDetailsService } from "./slide-details.service";

@ApiTags("Slide Details")
@ApiBearerAuth()
@UseInterceptors(ContextInterceptor)
@Controller("slide-details")
export class SlideDetailsController {
    constructor(private readonly slideDetailsService: SlideDetailsService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createSlideDetailDto: CreateSlideDetailDto) {
        return this.slideDetailsService.create(createSlideDetailDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: SlideDetailFilter): Promise<SlideDetail[]> {
        return this.slideDetailsService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.slideDetailsService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateSlideDetailDto: UpdateSlideDetailDto) {
        return this.slideDetailsService.update(+id, updateSlideDetailDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.slideDetailsService.destroy(+id);
    }
}
