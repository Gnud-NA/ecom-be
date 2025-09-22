import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryRepository } from "@src/app/categories/categories.repository";
import Category from "@src/app/categories/entities/category.entity";
import { MediaRepository } from "@src/app/media/media.repository";
import Post from "@src/app/posts/entities/post.entity";
import { PostsRepository } from "@src/app/posts/posts.repository";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [SequelizeModule.forFeature([Post, Category])],
    controllers: [PostsController],
    providers: [PostsService, PostsRepository, CategoryRepository, MediaRepository],
    exports: [PostsService, PostsRepository],
})
export class PostsModule {}
