import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import Category from "@src/app/categories/entities/category.entity";
import Device from "@src/app/devices/entities/device.entity";
import Media from "@src/app/media/entities/media.entity";
import { PostCategory } from "@src/app/post-category/entities/post-category.entity";
import Post from "@src/app/posts/entities/post.entity";
import Role from "@src/app/role/entities/role.entity";
import Setting from "@src/app/setting/entities/setting.entity";
import { UserRole } from "@src/app/user-role/entities/user-role.entity";
import User from "@src/app/users/entities/user.entity";
import AddressBook from "@src/ecom/address-book/entities/address-book.entity";
import CartDetail from "@src/ecom/cart-detail/entities/cart-detail.entity";
import Cart from "@src/ecom/cart/entities/cart.entity";
import Color from "@src/ecom/color/entities/color.entity";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import OrderDetail from "@src/ecom/order-detail/entities/order-detail.entity";
import OrderPayment from "@src/ecom/order-payment/entities/order-payment.entity";
import Order from "@src/ecom/order/entities/order.entity";
import { ProductCategory } from "@src/ecom/product-category/entities/product-category.entity";
import { ProductColor } from "@src/ecom/product-color/entities/product-color.entity";
import { ProductGallery } from "@src/ecom/product-gallery/entities/product-gallery.entity";
import { ProductSize } from "@src/ecom/product-size/entities/product-size.entity";
import Product from "@src/ecom/product/entities/product.entity";
import RegistryDetail from "@src/ecom/registry-detail/entities/registry-detail.entity";
import RegistryEvent from "@src/ecom/registry-event/entities/registry-event.entity";
import Registry from "@src/ecom/registry/entities/registry.entity";
import RewardEvent from "@src/ecom/reward-event/entities/reward-event.entity";
import RewardMilestoneSetting from "@src/ecom/reward-milestone-setting/entities/reward-milestone-setting.entity";
import ShippingMethod from "@src/ecom/shipping-method/entities/shipping-method.entity";
import Size from "@src/ecom/size/entities/size.entity";
import TierBenefit from "@src/ecom/tier-benefits/entities/tier-benefits.entity";
import TierRewardEvent from "@src/ecom/tier-reward-event/entities/tier-reward-event.entity";
import Tier from "@src/ecom/tier/entities/tier.entity";
import UserAchievedThresholds from "@src/ecom/user-achieved-thresholds/entities/user-achieved-thresholds.entity";
import UserBankCard from "@src/ecom/user-bank-card/entities/user-bank-card.entity";
import UserRewardPoint from "@src/ecom/user-reward-point/entities/user-reward-point.entity";
import EcomWallet from "@src/ecom/wallet/entities/wallet.entity";

// export const TypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//     imports: [ConfigModule],
//     inject: [ConfigService],
//     useFactory: async (): Promise<TypeOrmModuleOptions> => {
//         return {
//             type: "postgres",
//             host: process.env.DATABASE_HOST || "127.0.0.1",
//             port: Number(process.env.DATABASE_PORT) || 25432,
//             username: process.env.DATABASE_USERNAME || "dev_user1",
//             password: process.env.DATABASE_PASSWORD || "RGcdLXKjW3D5sBhC",
//             database: process.env.DATABASE_DB || "dev_web",
//             autoLoadEntities: true,
//             entities: [__dirname + "/../**/*.entity.{js,ts}"],
//             synchronize: true,
//             logging: false,
//             migrations: ["dist/migrations/**/*.js"],
//             extra: {
//                 charset: "utf8mb4_unicode_ci",
//             },
//         };
//     },
// };

// export const TypeOrmConfig: TypeOrmModuleOptions = {
//     type: "postgres",
//     host: process.env.DATABASE_HOST || "127.0.0.1",
//     port: Number(process.env.DATABASE_PORT) || 25432,
//     username: process.env.DATABASE_USERNAME || "dev_user1",
//     password: process.env.DATABASE_PASSWORD || "RGcdLXKjW3D5sBhC",
//     database: process.env.DATABASE_DB || "dev_web",
//     autoLoadEntities: true,
//     entities: [__dirname + "/../**/*.entity.{js,ts}"],
//     synchronize: true,
//     logging: false,
//     migrations: ["dist/migrations/**/*.js"],
//     extra: {
//         charset: "utf8mb4_unicode_ci",
//     },
// };

export const SequelizeConfig = {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: "SEQUELIZE_PROVIDER",
    useFactory: async (): Promise<any> => {
        const sequelize: SequelizeModuleOptions = {
            dialect: "postgres",
            host: process.env.DATABASE_HOST || "127.0.0.1",
            port: Number(process.env.DATABASE_PORT) || 25432,
            username: process.env.DATABASE_USERNAME || "dev_user",
            password: process.env.DATABASE_PASSWORD || "RGcdLXKjW3D5sBhC",
            database: process.env.DATABASE_DB || "dev_web",
            models: [
                Category,
                PostCategory,
                User,
                Device,
                Setting,
                Role,
                Post,
                Media,
                UserRole,
                Product,
                OrderDetail,
                EcomCategory,
                ProductCategory,
                ShippingMethod,
                ProductColor,
                Color,
                Size,
                ProductGallery,
                ProductSize,
                Cart,
                CartDetail,
                RegistryDetail,
                RegistryEvent,
                Registry,
                UserBankCard,
                Favorites,
                AddressBook,
                Order,
                OrderPayment,
                Tier,
                TierBenefit,
                TierRewardEvent,
                RewardEvent,
                UserRewardPoint,
                RewardMilestoneSetting,
                EcomWallet,
                UserAchievedThresholds,
            ],
            // models: [__dirname + "/../**/*.entity.{js,ts}", User],
            logging: true,
            autoLoadModels: true,
            synchronize: false,
        };
        console.log("PORT: ", process.env.DATABASE_PORT);
        console.log("HOST: ", process.env.DATABASE_HOST);
        console.log("PW: ", process.env.DATABASE_PASSWORD);
        console.log("first: ", process.env.DATABASE_DB);
        return sequelize;
    },
};

// export const MongodbConfig = {
//     imports: [ConfigModule],
//     inject: [ConfigService],
//     provide: "MONGODB_PROVIDER",
//     useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
//         const host = process.env.MONGODB_HOST ?? "localhost";
//         const port = process.env.MONGODB_PORT ?? "27016";
//         const dbName = process.env.MONGODB_DB ?? "tool";
//         const username = process.env.MONGODB_USERNAME ?? "admin";
//         const password = process.env.MONGODB_PASSWORD ?? "root@123";
//         const mongodbOptions: MongooseModuleOptions = {
//             uri: `mongodb://${host}:${port}`,
//             dbName: dbName,
//             user: username,
//             pass: password,

//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//             // Other MongoDB options...
//         };
//         return mongodbOptions;
//     },
// };

export const MongodbConfig = {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: "MONGODB_PROVIDER",
    useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        const host = process.env.MONGODB_HOST ?? "e-commerce.zxudebj.mongodb.net";
        const dbName = process.env.MONGODB_DB ?? "e-commerce";
        const username = process.env.MONGODB_USERNAME ?? "nguyenanhdung462";
        const password = encodeURIComponent(process.env.MONGODB_PASSWORD ?? "JglVFwIbFprusvX6");

        const uri = `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;

        return {
            uri,
            dbName,
        };
    },
};

export const PgDbTest = (): SequelizeModuleOptions => {
    console.log("PORT: ", process.env.DATABASE_PORT);
    return {
        dialect: "postgres",
        host: process.env.DATABASE_HOST ?? "127.0.0.1",
        port: Number(process.env.DATABASE_PORT ?? 25432),
        username: "dev_user",
        password: "RGcdLXKjW3D5sBhC",
        database: process.env.DATABASE_DB ?? `dev_web`,
        models: [Category, PostCategory, User, Device, Setting, Role, Post, UserRole, Product],
        logging: false,
        autoLoadModels: true,
        synchronize: false,
    };
};
