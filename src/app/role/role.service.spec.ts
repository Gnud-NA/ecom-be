import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { RoleRepository } from "@src/app/role/role.repository";
import { PgDbTest } from "@src/databases/databases.provider";
import { RoleService } from "./role.service";

describe("RoleService", () => {
    let service: RoleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SequelizeModule.forRoot(PgDbTest())],
            providers: [RoleService, RoleRepository],
        }).compile();

        service = await module.get<RoleService>(RoleService);
    });

    it("should be defined", async () => {
        await expect(service).toBeDefined();
    });
});
