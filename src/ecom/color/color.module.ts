import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ColorRepository } from "@src/ecom/color/color.repository";
import Color from "@src/ecom/color/entities/color.entity";
import { ColorController } from "./color.controller";
import { ColorService } from "./color.service";

@Module({
    imports: [SequelizeModule.forFeature([Color])],
    controllers: [ColorController],
    providers: [ColorService, ColorRepository],
    exports: [ColorService, ColorRepository],
})
export class ColorModule {}
