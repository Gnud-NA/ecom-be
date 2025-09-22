import { RedisService } from "@liaoliaots/nestjs-redis";
import { Inject, Injectable } from "@nestjs/common";
import { AwaitTimeDefaultEnum, CacheRedisKeyEnum } from "@src/config";
import moment = require("moment");

@Injectable()
export class RedisCoreService {
    constructor(@Inject(RedisService) private readonly redisService: RedisService) {}

    async get(key: string) {
        const cache = await this.redisService.getOrThrow();
        return cache.get(key);
    }

    async set(key: string, value: any) {
        const cache = await this.redisService.getOrThrow();
        cache.set(key, value);
        return true;
    }
    async flush() {
        const cache = await this.redisService.getOrThrow();
        cache.flushall();
        return true;
    }
    async checkApiWait() {
        const cache = await this.redisService.getOrThrow();
        const apiWait: string | null = await cache.get(CacheRedisKeyEnum.API_AWAIT);
        const apiWaitTimes: string | null = await cache.get(CacheRedisKeyEnum.API_TIMES);

        if (!apiWait) {
            cache.set(CacheRedisKeyEnum.API_AWAIT, moment().valueOf());
            return true;
        }

        if (Math.abs(moment(Number(apiWait)).diff(moment.now(), "minutes")) > 5) {
            await this.refreshApiWait();
            return true;
        }

        if (
            Math.abs(moment(Number(apiWait)).diff(moment.now(), "minutes")) <= 5 &&
            Number(apiWaitTimes) > Number(process.env.API_LIMIT_PER_FIVE_MINUTES ?? 100)
        ) {
            return false;
        }

        return true;
    }

    async refreshApiWait() {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.API_AWAIT, moment().valueOf());
        await cache.set(CacheRedisKeyEnum.API_TIMES, 0);
    }

    async setApiWaitTimes() {
        const cache = await this.redisService.getOrThrow();
        const apiWaitTimes: string | null = await cache.get(CacheRedisKeyEnum.API_TIMES);
        await cache.set(CacheRedisKeyEnum.API_TIMES, Number(apiWaitTimes ?? 0) + 1);
    }

    async setBlockApi() {
        const cache = await this.redisService.getOrThrow();
        const apiWaitTimes: string | null = await cache.get(CacheRedisKeyEnum.API_TIMES);
        await cache.set(CacheRedisKeyEnum.API_TIMES, 1000);
        await cache.set(CacheRedisKeyEnum.API_AWAIT, moment().valueOf());
    }

    async checkOrderWaitting() {
        const cache = await this.redisService.getOrThrow();
        const orderWaitting: string | null = await cache.get(CacheRedisKeyEnum.ORDER_TIME);
        const lastPosition: string | null = await cache.get(CacheRedisKeyEnum.POSITION_TIME);

        if (!lastPosition) {
            return true;
        }

        if (Math.abs(moment(Number(lastPosition)).diff(moment.now(), "minutes")) <= 15) {
            return false;
        }

        if (Math.abs(moment(Number(lastPosition)).diff(moment.now(), "minutes")) > 15) {
            await this.resetLastPosition();
            return true;
        }

        return true;
    }

    async refreshCache() {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.API_AWAIT, moment().valueOf());
        await cache.set(CacheRedisKeyEnum.API_TIMES, 0);
        await cache.set(CacheRedisKeyEnum.ORDER_TIME, undefined);
        await cache.set(CacheRedisKeyEnum.POSITION_TIME, undefined);
    }

    async resetOrder() {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.IS_RESET, "TRUE");
    }

    async setLastPosition() {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.POSITION_TIME, moment().valueOf());
    }

    async resetLastPosition() {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.POSITION_TIME, undefined);
    }

    async checkChangePriceTime(): Promise<boolean> {
        const cache = await this.redisService.getOrThrow();
        const changeTime = await cache.get(CacheRedisKeyEnum.CHANGE_PRICE_AWAIT_TIME);
        if (Math.abs(moment(Number(changeTime)).diff(moment.now(), "minutes")) < AwaitTimeDefaultEnum.CHANGE_PRICE) {
            return false;
        }

        return true;
    }

    async setTakeProfitFlag(value: "TRUE" | "FALSE") {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.TAKE_PROFIT_FLAG, value);
    }

    async setLongShortFlag(value: "LONG" | "SHORT") {
        const cache = await this.redisService.getOrThrow();
        await cache.set(CacheRedisKeyEnum.LONG_SHORT_FLAG, value);
    }
}
