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
import { SlideFilter } from "@src/app/slides/dto/slides.dto";
import Slide from "@src/app/slides/entities/slide.entity";
import { RequestWithAuth } from "@src/base";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { CreateSlideDto } from "./dto/create-slide.dto";
import { UpdateSlideDto } from "./dto/update-slide.dto";
import { SlidesService } from "./slides.service";

@ApiTags("Slides")
@ApiBearerAuth()
@UseInterceptors(ContextInterceptor)
@Controller("slides")
export class SlidesController {
    constructor(private readonly slidesService: SlidesService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createSlideDto: CreateSlideDto, @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;
        return this.slidesService.create({ ...createSlideDto, userId: createSlideDto?.userId ?? userId });
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() request: SlideFilter): Promise<Slide[]> {
        return this.slidesService.findAll(request);
    }

    @UseGuards(AdminGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.slidesService.findOne(+id);
    }

    @UseGuards(AdminGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateSlideDto) {
        return this.slidesService.update(+id, updateCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.slidesService.destroy(+id);
    }
}
