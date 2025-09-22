import { ConsoleLogger, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import moment = require("moment");

@Injectable()
export class LoggerService extends ConsoleLogger {
    //   private readonly logger;
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
        super();
        // this.logger = logger;
    }
    error(message: any, stack?: string, context?: string) {
        // add your tailored logic here
        super.error(message);
    }

    wLogs(message: string, stack?: string) {
        this.logger.info(`${moment().toISOString()} - ${message}`, stack);
    }
    wDebug(message: string, stack?: string) {
        this.logger.debug(`${moment().toISOString()} - ${message}`, stack);
    }
}
