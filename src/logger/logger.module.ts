import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import winston = require("winston/lib/winston/transports");

@Module({
    providers: [LoggerService],
})
export class LoggerModule {}
