import { RedisModule } from "@liaoliaots/nestjs-redis";
import { Module } from "@nestjs/common";
import { RedisCoreService } from "./redis-core.service";
@Module({
    imports: [
        RedisModule.forRootAsync(
            {
                useFactory: () => {
                    return {
                        config: {
                            // url: "redis://localhost:6379",
                            host: process.env.REDIS_HOST ?? "localhost",
                            port: Number(process.env.REDIS_PORT ?? 6379),
                            password: process.env.REDIS_PASSWORD ?? "root@123",
                        },
                    };
                },
            },
            true
        ),
    ],
    providers: [RedisCoreService],
    exports: [RedisCoreService],
})
export class RedisCoreModule {}
