import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { FilterMongoPriceLogsDto } from "@src/app/mongo-price-logs/dto/mongo-price-log.dto";
import { CreateMongoPriceLogDto } from "./dto/create-mongo-price-log.dto";
import { MongoPriceLogsService } from "./mongo-price-logs.service";

@ApiTags("Price-logs")
@ApiBearerAuth()
@Controller("price-logs")
export class MongoPriceLogsController {
    constructor(private readonly mongoPriceLogsService: MongoPriceLogsService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() createMongoPriceLogDto: CreateMongoPriceLogDto) {
        return this.mongoPriceLogsService.create(createMongoPriceLogDto);
    }

    @UseGuards(AdminGuard)
    @Get()
    findAll(@Query() filter?: FilterMongoPriceLogsDto) {
        return this.mongoPriceLogsService.findAll(filter);
    }
}
