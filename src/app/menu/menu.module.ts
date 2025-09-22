import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Menu from "@src/app/menu/entities/menu.entity";
import { MenuRepository } from "@src/app/menu/menu.repository";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";

@Module({
    imports: [SequelizeModule.forFeature([Menu])],
    controllers: [MenuController],
    providers: [MenuService, MenuRepository],
})
export class MenuModule {}
