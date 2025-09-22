import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { PostsModule } from "@src/app/posts/posts.module";
import { PostsRepository } from "@src/app/posts/posts.repository";
import { PgDbTest } from "@src/databases/databases.provider";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

describe("PostsController", () => {
    let controller: PostsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SequelizeModule.forRoot(PgDbTest()), PostsModule],
            controllers: [PostsController],
            providers: [PostsService, PostsRepository],
        }).compile();

        controller = await module.get<PostsController>(PostsController);
    });

    it("should be defined", async () => {
        await expect(controller).toBeDefined();
    });
});
