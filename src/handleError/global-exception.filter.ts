import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { insertIfObject } from "@src/utils";
import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // console.log(exception, "exception");

        this.logger.error({
            timestamp: new Date().toISOString(),
            stack: isEmpty(exception) ? exception.stack : exception,
        });
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message,
                response: exception.getResponse(),
                ...insertIfObject(process.env.NODE_ENV !== "production", {
                    stack: exception.stack,
                }),
            });
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                timestamp: new Date().toISOString(),
                ...insertIfObject(process.env.NODE_ENV !== "production", {
                    stack: exception,
                }),
            });
        }
    }
}
