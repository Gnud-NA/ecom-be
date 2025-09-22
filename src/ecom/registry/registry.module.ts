import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import User from "@src/app/users/entities/user.entity";
import { UserRepository } from "@src/app/users/users.repository";
import RegistryEvent from "@src/ecom/registry-event/entities/registry-event.entity";
import { RegistryEventRepository } from "@src/ecom/registry-event/registry-event.repository";
import Registry from "@src/ecom/registry/entities/registry.entity";
import RegistryDetail from "../registry-detail/entities/registry-detail.entity";
import { RegistryDetailRepository } from "../registry-detail/registry-detail.repository";
import { RegistryController } from "./registry.controller";
import { RegistryRepository } from "./registry.repository";
import { RegistryService } from "./registry.service";

@Module({
    imports: [SequelizeModule.forFeature([User, Registry, RegistryEvent, RegistryDetail])],
    controllers: [RegistryController],
    providers: [RegistryService, RegistryRepository, UserRepository, RegistryEventRepository, RegistryDetailRepository],
    exports: [RegistryService],
})
export class RegistryModule {}
