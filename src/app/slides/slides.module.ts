import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Slide } from "@src/app/slides/entities/slide.entity";
import { SlidesRepository } from "@src/app/slides/slides.repository";
import { SlidesController } from "./slides.controller";
import { SlidesService } from "./slides.service";

@Module({
    imports: [SequelizeModule.forFeature([Slide])],
    controllers: [SlidesController],
    providers: [SlidesService, SlidesRepository],
})
export class SlidesModule {}
