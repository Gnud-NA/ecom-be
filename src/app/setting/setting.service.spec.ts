import { Test, TestingModule } from "@nestjs/testing";
import { SettingService } from "./setting.service";

import { SequelizeModule } from "@nestjs/sequelize";
import { SettingModule } from "@src/app/setting/setting.module";
import { SettingRepository } from "@src/app/setting/setting.repository";
import { PgDbTest } from "@src/databases/databases.provider";
import { LoggerModule } from "@src/logger/logger.module";
import { RedisCoreModule } from "@src/redis-core/redis-core.module";
import { RedisCoreService } from "@src/redis-core/redis-core.service";
describe("SettingService", () => {
    let service: SettingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SequelizeModule.forRoot(PgDbTest()), SettingModule, LoggerModule, RedisCoreModule],
            providers: [SettingService, SettingRepository, RedisCoreService],
        }).compile();
        service = await module.get<SettingService>(SettingService);
    });

    it("should be defined", async () => {
        await expect(service).toBeDefined();
    });

    beforeAll(async () => {
        await jest.setTimeout(10000);
    });
});
