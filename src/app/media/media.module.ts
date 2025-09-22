import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { SequelizeModule } from "@nestjs/sequelize";
import Media from "@src/app/media/entities/media.entity";
import { MediaRepository } from "@src/app/media/media.repository";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Media]),
        MulterModule.register({
            dest: "./tmps", // Thư mục lưu trữ hình ảnh
        }),
    ],
    controllers: [MediaController],
    providers: [MediaService, MediaRepository],
    exports: [MediaService],
})
export class MediaModule {}
