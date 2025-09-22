import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { HelpersModule } from "@src/app/helper/helper.module";
import { MenuDetailModule } from "@src/app/menu-detail/menu-detail.module";
import { UserRoleModule } from "@src/app/user-role/user-role.module";
import { AddressBookModule } from "@src/ecom/address-book/address-book.module";
import { CartModule } from "@src/ecom/cart/cart.module";
import { ColorModule } from "@src/ecom/color/color.module";
import { CountryModule } from "@src/ecom/country/country.module";
import { EcomCategoriesModule } from "@src/ecom/ecom-categories/ecom-categories.module";
import { FavoritesModule } from "@src/ecom/favorites/favorites.module";
import { ImportProductModule } from "@src/ecom/import-product/import-product.module";
import { OrderDetailModule } from "@src/ecom/order-detail/order-detail.module";
import { OrderPaymentModule } from "@src/ecom/order-payment/order-payment.module";
import { OrderModule } from "@src/ecom/order/order.module";
import { PaymentModule } from "@src/ecom/payment/payment.module";
import { ProductCategoryModule } from "@src/ecom/product-category/product-category.module";
import { ProductColorModule } from "@src/ecom/product-color/product-color.module";
import { ProductGalleryModule } from "@src/ecom/product-gallery/product-gallery.module";
import { ProductSizeModule } from "@src/ecom/product-size/product-size.module";
import { RegistryDetailModule } from "@src/ecom/registry-detail/registry-detail.module";
import { RegistryEventModule } from "@src/ecom/registry-event/registry-event.module";
import { RegistryModule } from "@src/ecom/registry/registry.module";
import { RewardEventModule } from "@src/ecom/reward-event/reward-event.module";
import { RewardMilestoneSettingModule } from "@src/ecom/reward-milestone-setting/reward-milestone-setting.module";
import { ShippingMethodModule } from "@src/ecom/shipping-method/shipping-method.module";
import { SizeModule } from "@src/ecom/size/size.module";
import { StateModule } from "@src/ecom/state/state.module";
import { TierBenefitModule } from "@src/ecom/tier-benefits/tier-benefits.module";
import { TierRewardEventModule } from "@src/ecom/tier-reward-event/tier-reward-event.module";
import { TierModule } from "@src/ecom/tier/tier.module";
import { UserAchievedThresholdsModule } from "@src/ecom/user-achieved-thresholds/user-achieved-thresholds.module";
import { UserBankCardModule } from "@src/ecom/user-bank-card/user-bank-card.module";
import { UserRewardPointModule } from "@src/ecom/user-reward-point/user-reward-point.module";
import { VoucherModule } from "@src/ecom/voucher/voucher.module";
import { WalletTransactionModule } from "@src/ecom/wallet-transaction/wallet-transaction.module";
import { GlobalExceptionFilter } from "@src/handleError/global-exception.filter";
import { AuthMiddleware } from "@src/middlewares/auth.middleware";
import { JsonBodyMiddleware } from "@src/middlewares/json-body-middleware";
import { RawBodyMiddleware } from "@src/middlewares/raw-body.middleware";
import { WinstonModule } from "nest-winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./app/auth/auth.module";
import { CategoriesModule } from "./app/categories/categories.module";
import { CollectionModule } from "./app/collection/collection.module";
import { DevicesModule } from "./app/devices/devices.module";
import { MediaModule } from "./app/media/media.module";
import { MenuModule } from "./app/menu/menu.module";
import { MongoPriceLogsModule } from "./app/mongo-price-logs/mongo-price-logs.module";
import { PostCategoryModule } from "./app/post-category/post-category.module";
import { PostsModule } from "./app/posts/posts.module";
import { RoleModule } from "./app/role/role.module";
import { SettingModule } from "./app/setting/setting.module";
import { SlideDetailsModule } from "./app/slide-details/slide-details.module";
import { SlidesModule } from "./app/slides/slides.module";
import { TelegramModule } from "./app/telegram/telegram.module";
import { UsersModule } from "./app/users/users.module";
import { WebAppModule } from "./app/web-app/web-app.module";
import { BaseModule } from "./base/base.module";
import { DatabasesModule } from "./databases/databases.module";
import { ProductModule } from "./ecom/product/product.module";
import { WalletModule } from "./ecom/wallet/wallet.module";
import { LoggerModule } from "./logger/logger.module";
import { RedisCoreModule } from "./redis-core/redis-core.module";
import winston = require("winston");
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env", ".development.env"],
            isGlobal: true,
            cache: true, // development
        }),
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console(),
                new DailyRotateFile({
                    level: "error",
                    dirname: "logs", // Thư mục chứa các tệp log
                    filename: "app-%DATE%.log", // Tên tệp log với ngày
                    datePattern: "YYYY-MM-DD", // Định dạng ngày trong tên tệp
                    zippedArchive: true, // Nén tệp log cũ
                    maxSize: "20m", // Kích thước tối đa của tệp log
                    maxFiles: "14d", // Số ngày lưu trữ tệp log
                }),
            ],
        }),
        DatabasesModule,
        HelpersModule,
        UsersModule,
        RoleModule,
        BaseModule,
        CategoriesModule,
        AuthModule,
        DevicesModule,
        SettingModule,
        RedisCoreModule,
        LoggerModule,
        TelegramModule,
        MongoPriceLogsModule,
        PostsModule,
        MenuModule,
        MenuDetailModule,
        MediaModule,
        WebAppModule,
        PostCategoryModule,
        UserRoleModule,
        CollectionModule,
        SlidesModule,
        SlideDetailsModule,
        ProductModule,
        EcomCategoriesModule,
        ProductCategoryModule,
        ProductColorModule,
        ProductSizeModule,
        ColorModule,
        SizeModule,
        OrderModule,
        OrderDetailModule,
        VoucherModule,
        CountryModule,
        StateModule,
        ShippingMethodModule,
        PaymentModule,
        ProductGalleryModule,
        OrderPaymentModule,
        CartModule,
        ImportProductModule,
        AddressBookModule,
        FavoritesModule,
        UserBankCardModule,
        RegistryEventModule,
        RegistryModule,
        RegistryDetailModule,
        TierBenefitModule,
        TierModule,
        RewardEventModule,
        TierRewardEventModule,
        UserRewardPointModule,
        RewardMilestoneSettingModule,
        WalletModule,
        WalletTransactionModule,
        UserAchievedThresholdsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        DatabasesModule,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RawBodyMiddleware)
            .forRoutes({
                path: "/ecom/payments/stripe/stripe-payment-callback",
                method: RequestMethod.POST,
            })
            .apply(JsonBodyMiddleware)

            .forRoutes("*")
            .apply(AuthMiddleware)
            .forRoutes("*");
        // consumer.apply(bodyParser.raw({ type: "application/json" })).forRoutes("*");
        // consumer.apply(AuthMiddleware).forRoutes("*"); // Áp dụng middleware cho tất cả các route
    }
}
