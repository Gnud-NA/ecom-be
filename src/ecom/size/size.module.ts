import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import Size from "@src/ecom/size/entities/size.entity";
import { SizeRepository } from "@src/ecom/size/size.repository";
import { SizeService } from "@src/ecom/size/size.service";
import { SizeController } from "./size.controller";

@Module({
    imports: [SequelizeModule.forFeature([Size])],
    controllers: [SizeController],
    providers: [SizeService, SizeRepository],
    exports: [SizeService, SizeRepository],
})
export class SizeModule {}
