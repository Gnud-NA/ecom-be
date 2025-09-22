import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";

describe("CategoriesService", () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it("should be defined1111111", () => {
    expect(service).toBeDefined();
    // expect(service).toBe(null);
  });
});
