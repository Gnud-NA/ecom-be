import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import Role from "@src/app/role/entities/role.entity";
import { RoleRepository } from "@src/app/role/role.repository";
import { PgDbTest } from "@src/databases/databases.provider";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

describe("RoleController", () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(PgDbTest()),
        SequelizeModule.forFeature([Role]),
      ],
      controllers: [RoleController],
      providers: [RoleService, RoleRepository],
    }).compile();

    controller = await module.get<RoleController>(RoleController);
  });

  it("should be defined", async () => {
    await expect(controller).toBeDefined();
  });
});
