import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import MenuDetail from "@src/app/menu-detail/entities/menu-detail.entity";
import { MenuDetailRepository } from "@src/app/menu-detail/menu-detail.repository";
import { MenuDetailController } from "./menu-detail.controller";
import { MenuDetailService } from "./menu-detail.service";

@Module({
    imports: [
        // TypeOrmExModule.forFeature([MenuDetailRepository]),
        SequelizeModule.forFeature([MenuDetail]),
    ],
    controllers: [MenuDetailController],
    providers: [MenuDetailService, MenuDetailRepository],
    exports: [],
})
export class MenuDetailModule {}
