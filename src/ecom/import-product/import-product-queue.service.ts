import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class ImportProductQueueService {
    constructor(@InjectQueue("import-product") private readonly importProductQueue: Queue) {}

    async addImportCsvJob(data: { file: Express.Multer.File; userId?: number; brandName: string }) {
        return this.importProductQueue.add("import-csv", data, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 5000,
            },
            removeOnComplete: true,
        });
    }
}
