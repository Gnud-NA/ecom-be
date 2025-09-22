import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { PostsModule } from "@src/app/posts/posts.module";
import { PostsRepository } from "@src/app/posts/posts.repository";
import { PgDbTest } from "@src/databases/databases.provider";
import { PostsService } from "./posts.service";

describe("PostsService", () => {
    let service: PostsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SequelizeModule.forRoot(PgDbTest()), PostsModule],
            providers: [PostsService, PostsRepository],
        }).compile();

        service = await module.get<PostsService>(PostsService);
    });

    it("should be defined", async () => {
        await expect(service).toBeDefined();
    });
});
