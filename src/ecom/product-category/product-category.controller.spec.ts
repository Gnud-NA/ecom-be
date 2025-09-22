import { Test, TestingModule } from "@nestjs/testing";
import { ProductCategoryService } from "@src/ecom/product-category/product-category.service";
import { ProductCategoryController } from "./product-category.controller";

describe("ProductCategoryController", () => {
    let controller: ProductCategoryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductCategoryController],
            providers: [ProductCategoryService],
        }).compile();

        controller = module.get<ProductCategoryController>(ProductCategoryController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
