import { Test, TestingModule } from "@nestjs/testing";
import { MenuDetailService } from "./menu-detail.service";

describe("MenuDetailService", () => {
    let service: MenuDetailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MenuDetailService],
        }).compile();

        service = module.get<MenuDetailService>(MenuDetailService);
    });

    it("should be defined1111111", () => {
        expect(service).toBeDefined();
        // expect(service).toBe(null);
    });
});
