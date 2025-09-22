import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MediaRepository } from "@src/app/media/media.repository";
import SlideDetail from "@src/app/slide-details/entities/slide-detail.entity";
import { SlideDetailsRepository } from "@src/app/slide-details/slide-details.repository";
import { SlideDetailsController } from "./slide-details.controller";
import { SlideDetailsService } from "./slide-details.service";

@Module({
    imports: [SequelizeModule.forFeature([SlideDetail])],
    controllers: [SlideDetailsController],
    providers: [SlideDetailsService, SlideDetailsRepository, MediaRepository],
})
export class SlideDetailsModule {}
