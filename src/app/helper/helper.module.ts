import { Module } from "@nestjs/common";
import { HelperService } from "@src/app/helper/helper.service";
import { EmailTemplate } from "@src/app/helper/template.email";
import { LoggerService } from "@src/logger/logger.service";

@Module({
    // controllers: [DevicesController],
    imports: [],
    providers: [HelperService, EmailTemplate, LoggerService],
    exports: [HelperService, EmailTemplate],
})
export class HelpersModule {}
