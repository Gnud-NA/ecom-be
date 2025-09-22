import { BullModule } from "@nestjs/bull";
import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import { HelperService } from "@src/app/helper/helper.service";
import { EmailTemplate } from "@src/app/helper/template.email";
import { MenuRepository } from "@src/app/menu/menu.repository";
import { PostsRepository } from "@src/app/posts/posts.repository";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { SlidesRepository } from "@src/app/slides/slides.repository";
import { UserRepository } from "@src/app/users/users.repository";
import { RewardProcessor } from "@src/app/web-app/reward.processor";
import { EcomCategoryRepository } from "@src/ecom/ecom-categories/ecom-categories.repository";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { RewardMilestoneSettingRepository } from "@src/ecom/reward-milestone-setting/reward-milestone-setting.repository";
import { UserAchievedThresholdsRepository } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.repository";
import { UserAchievedThresholdsService } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.service";
import { UserRewardPointRepository } from "@src/ecom/user-reward-point/user-reward-point.repository";
import { VoucherRepository } from "@src/ecom/voucher/voucher.repository";
import { WalletTransactionRepository } from "@src/ecom/wallet-transaction/wallet-transaction.repository";
import { WalletRepository } from "@src/ecom/wallet/wallet.repository";
import { WalletService } from "@src/ecom/wallet/wallet.service";
import { LoggerService } from "@src/logger/logger.service";
import { RedisCoreService } from "@src/redis-core/redis-core.service";
import { WebAppController } from "./web-app.controller";
import { WebAppService } from "./web-app.service";

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get("REDIS_HOST", "localhost"),
                    port: Number(configService.get("REDIS_PORT", 6379)),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: "claim-reward",
        }),
    ],
    controllers: [WebAppController],
    providers: [
        WebAppService,
        PostsRepository,
        SettingRepository,
        RedisCoreService,
        CategoryRepository,
        MenuRepository,
        SlidesRepository,
        HelperService,
        EmailTemplate,
        LoggerService,
        VoucherRepository,
        ProductRepository,
        EcomCategoryRepository,
        Logger,
        UserRepository,
        UserRewardPointRepository,
        RewardMilestoneSettingRepository,
        WalletRepository,
        WalletTransactionRepository,
        UserAchievedThresholdsRepository,
        UserAchievedThresholdsService,
        WalletService,
        RewardProcessor,
    ],
})
export class WebAppModule {}
