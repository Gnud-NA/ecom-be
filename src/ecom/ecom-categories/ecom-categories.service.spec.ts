import { Test, TestingModule } from "@nestjs/testing";
import { EcomCategoriesService } from "./ecom-categories.service";

describe("EcomCategoriesService", () => {
    let service: EcomCategoriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EcomCategoriesService],
        }).compile();

        service = module.get<EcomCategoriesService>(EcomCategoriesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        // expect(service).toBe(null);
    });
});
