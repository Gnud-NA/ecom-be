import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminStrategy } from "@src/app/auth/admin.strategy";
import { AuthRepository } from "@src/app/auth/auth.repository";
import { Auth } from "@src/app/auth/entities/auth.entity";
import { UserStrategy } from "@src/app/auth/user.strategy";
import { DeviceRepository } from "@src/app/devices/devices.repository";
import Device from "@src/app/devices/entities/device.entity";
import { HelperService } from "@src/app/helper/helper.service";
import { EmailTemplate } from "@src/app/helper/template.email";
import Favorites from "@src/ecom/favorites/entities/favorites.entity";
import { FavoritesRepository } from "@src/ecom/favorites/favorites.repository";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import { LoggerService } from "@src/logger/logger.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
@Module({
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: `${Number(configService.get<number>("JWT_EXPIRED_IN") ?? 604800)}s`,
                },
            }),
            inject: [ConfigService],
        }),
        SequelizeModule.forFeature([Auth, Device, Favorites]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
        AdminStrategy,
        UserStrategy,
        DeviceRepository,
        HelperService,
        EmailTemplate,
        LoggerService,
        FavoritesRepository,
        TierRepository,
    ],
})
export class AuthModule {}
