import { RedisModule } from "@liaoliaots/nestjs-redis";
import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { MongodbConfig, PgDbTest } from "@src/databases/databases.provider";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    // beforeAll(async () => {
    //   app = await Test.createTestingModule({
    //     imports: [
    //       SequelizeModule.forRoot(testDatabaseConfig), // Sử dụng cấu hình riêng cho testing
    //     ],
    //   }).compile();
    // });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                SequelizeModule.forRoot(PgDbTest()),
                MongooseModule.forRootAsync(MongodbConfig),
                RedisModule.forRootAsync(
                    {
                        useFactory: () => {
                            return {
                                config: {
                                    // url: "redis://localhost:6379",
                                    host: process.env.REDIS_HOST ?? "localhost",
                                    port: Number(process.env.REDIS_PORT ?? 6379),
                                    // password: process.env.REDIS_PASSWORD ?? "root@123",
                                },
                            };
                        },
                    },
                    true
                ),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/ (GET)", () => {
        return request(app.getHttpServer()).get("/").expect(200).expect("Hello World!");
    });
});
