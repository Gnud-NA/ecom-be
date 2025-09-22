import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import { MediaModule } from "@src/app/media/media.module";
import { MediaRepository } from "@src/app/media/media.repository";
import { ColorRepository } from "@src/ecom/color/color.repository";
import { ImportProductController } from "@src/ecom/import-product/import-product.controller";
import { ProductGalleryRepository } from "@src/ecom/product-gallery/product-gallery.repository";
import { Product } from "@src/ecom/product/entities/product.entity";
import { ProductRepository } from "@src/ecom/product/product.repository";
import { SizeModule } from "@src/ecom/size/size.module";
import { SizeRepository } from "@src/ecom/size/size.repository";
import { ImportProductProcessor } from "./import-product.processor";
import { ImportProductService } from "./import-product.service";
@Module({
    imports: [
        SequelizeModule.forFeature([Product]),
        MediaModule,
        SizeModule,
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get("REDIS_HOST", "localhost"),
                    port: Number(configService.get("REDIS_PORT", 6379)),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: "import-product",
        }),
    ],
    controllers: [ImportProductController],
    providers: [
        ImportProductService,
        ProductRepository,
        SizeRepository,
        CategoryRepository,
        ColorRepository,
        MediaRepository,
        ProductGalleryRepository,
        ImportProductProcessor,
    ],
})
export class ImportProductModule {}
