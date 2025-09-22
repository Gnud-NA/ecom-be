import { RedisModule } from "@liaoliaots/nestjs-redis";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import Setting from "@src/app/setting/entities/setting.entity";
import { SettingModule } from "@src/app/setting/setting.module";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { SettingService } from "@src/app/setting/setting.service";
import { PgDbTest } from "@src/databases/databases.provider";
import { SettingController } from "./setting.controller";

describe("SettingController", () => {
    let controller: SettingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot(PgDbTest()),
                SequelizeModule.forFeature([Setting]),
                SettingModule,
                RedisModule.forRootAsync(
                    {
                        useFactory: () => {
                            return {
                                config: {
                                    // url: "redis://localhost:6379",
                                    host: process.env.REDIS_HOST ?? "localhost",
                                    port: Number(process.env.REDIS_PORT ?? 6379),
                                    password: process.env.REDIS_PASSWORD ?? "root@123",
                                },
                            };
                        },
                    },
                    true
                ),
            ],
            controllers: [SettingController],
            providers: [SettingService, SettingRepository],
        }).compile();

        controller = await module.get<SettingController>(SettingController);
    });

    it("should be defined", async () => {
        await expect(controller).toBeDefined();
    });
});
