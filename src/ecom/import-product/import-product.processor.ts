import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { ImportProductService } from "./import-product.service";

@Processor("import-product")
export class ImportProductProcessor {
    private readonly logger = new Logger(ImportProductProcessor.name);

    constructor(private readonly importProductService: ImportProductService) {}

    @Process("import-product")
    async handleImportCsv(job: Job) {
        this.logger.debug(`Processing import CSV job ${job.id}`);
        try {
            console.log("job.data", job.data);

            await this.importProductService.handleImportProduct({ ...job.data });

            this.logger.debug(`Import CSV job ${job.id} completed successfully`);
            return { success: true };
        } catch (error) {
            this.logger.error(`Error in import CSV job ${job.id}: ${error.message}`, error.stack);
            throw error;
        }
    }
}
