import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EcomCategoryRepository } from "@src/ecom/ecom-categories/ecom-categories.repository";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { EcomCategoriesController } from "./ecom-categories.controller";
import { EcomCategoriesService } from "./ecom-categories.service";

@Module({
    imports: [
        // TypeOrmExModule.forFeature([CategoryRepository]),
        SequelizeModule.forFeature([EcomCategory]),
    ],
    controllers: [EcomCategoriesController],
    providers: [EcomCategoriesService, EcomCategoryRepository],
    exports: [],
})
export class EcomCategoriesModule {}
