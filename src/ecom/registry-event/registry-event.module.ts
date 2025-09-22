import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import RegistryEvent from "@src/ecom/registry-event/entities/registry-event.entity";
import { RegistryEventController } from "./registry-event.controller";
import { RegistryEventRepository } from "./registry-event.repository";
import { RegistryEventService } from "./registry-event.service";

@Module({
    imports: [SequelizeModule.forFeature([RegistryEvent])],
    controllers: [RegistryEventController],
    providers: [RegistryEventService, RegistryEventRepository],
    exports: [RegistryEventService],
})
export class RegistryEventModule {}
