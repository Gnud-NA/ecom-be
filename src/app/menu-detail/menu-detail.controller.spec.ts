import { Test, TestingModule } from "@nestjs/testing";
import { MenuDetailController } from "./menu-detail.controller";
import { MenuDetailService } from "./menu-detail.service";

describe("MenuDetailController", () => {
    let controller: MenuDetailController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MenuDetailController],
            providers: [MenuDetailService],
        }).compile();

        controller = module.get<MenuDetailController>(MenuDetailController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
