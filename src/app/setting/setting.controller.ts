import { Body, Controller, Get, Inject, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
import { FilterSettingDto, UpdateSettingDto } from "@src/app/setting/dto/setting.dto";
import { SettingService } from "@src/app/setting/setting.service";

@ApiTags("Settings")
@ApiBearerAuth()
@Controller("setting")
export class SettingController {
    constructor(@Inject(SettingService) private settingService: SettingService) {}

    @UseGuards(AdminGuard)
    @Get()
    findSetting(@Query() request: FilterSettingDto) {
        return this.settingService.findSetting(request);
    }

    @UseGuards(AdminGuard)
    @Put()
    async updateSetting(@Body() request: UpdateSettingDto) {
        return this.settingService.updateSetting(request);
    }
}
