import { Injectable, Scope } from "@nestjs/common";
import Setting from "@src/app/setting/entities/setting.entity";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { Telegraf } from "telegraf";

@Injectable({ scope: Scope.TRANSIENT })
export class TelegramService {
    private bot: Telegraf;
    private setting: Setting;

    constructor(private settingRepo: SettingRepository) {
        // this.init();
    }

    async init() {
        const setting = await this.settingRepo.findOne({ where: { id: 1 } });
        if (setting && setting?.telegramBotToken) {
            this.setting = setting;
            this.bot = new Telegraf(this.setting?.telegramBotToken ?? process.env.TELEGRAM_BOT_TOKEN);
        }
    }

    async sendMessage(message: string) {
        try {
            await this.init();
            if (this.setting && this.setting?.telegramChatId) {
                await this.bot.telegram.sendMessage(this.setting?.telegramChatId, message);
            }
        } catch (error) {
            // console.error(error);
        }
    }
}
