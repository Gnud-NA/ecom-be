import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Role from "@src/app/role/entities/role.entity";
import { RoleRepository } from "@src/app/role/role.repository";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
