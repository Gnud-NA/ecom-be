import { Module } from "@nestjs/common";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { TelegramService } from "./telegram.service";

@Module({
  providers: [TelegramService, SettingRepository],
})
export class TelegramModule {}
