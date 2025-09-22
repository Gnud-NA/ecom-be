import { Test, TestingModule } from "@nestjs/testing";
import { EcomCategoriesController } from "./ecom-categories.controller";
import { EcomCategoriesService } from "./ecom-categories.service";

describe("CategoriesController", () => {
    let controller: EcomCategoriesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EcomCategoriesController],
            providers: [EcomCategoriesService],
        }).compile();

        controller = module.get<EcomCategoriesController>(EcomCategoriesController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
