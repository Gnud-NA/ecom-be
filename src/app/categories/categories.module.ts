import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import Category from "@src/app/categories/entities/category.entity";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
  imports: [
    // TypeOrmExModule.forFeature([CategoryRepository]),
    SequelizeModule.forFeature([Category]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [],
})
export class CategoriesModule {}
