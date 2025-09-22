import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Setting from "@src/app/setting/entities/setting.entity";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { RedisCoreModule } from "@src/redis-core/redis-core.module";
import { RedisCoreService } from "@src/redis-core/redis-core.service";
import { SettingController } from "./setting.controller";
import { SettingService } from "./setting.service";

@Module({
    imports: [SequelizeModule.forFeature([Setting]), RedisCoreModule],
    providers: [SettingService, SettingRepository, RedisCoreService],
    controllers: [SettingController],
    exports: [RedisCoreService],
})
export class SettingModule {}
