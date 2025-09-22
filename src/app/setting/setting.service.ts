import { Inject, Injectable } from "@nestjs/common";
import { FilterSettingDto } from "@src/app/setting/dto/setting.dto";
import Setting from "@src/app/setting/entities/setting.entity";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { BaseService } from "@src/base";
import { RedisCoreService } from "@src/redis-core/redis-core.service";

@Injectable()
export class SettingService extends BaseService<Setting, SettingRepository> {
    constructor(
        @Inject(SettingRepository)
        private readonly settingRepo: SettingRepository,
        @Inject(RedisCoreService)
        private readonly redisCoreService: RedisCoreService
    ) {
        super(settingRepo);
    }

    async findSetting(request: FilterSettingDto) {
        let setting = await this.settingRepo.findOne({ where: { domain: request?.domain } });
        if (!setting) {
            setting = await this.create({ domain: request?.domain });
        }
        return setting;
    }

    async updateSetting(request: Partial<Setting>) {
        let setting = await this.settingRepo.findOne({ where: { domain: request.domain } });
        if (!setting) {
            setting = await this.create({ ...request });
        } else {
            await this.updateById(setting.id, { ...request });
        }
        return this.findSetting({ domain: request?.domain });
    }
}
