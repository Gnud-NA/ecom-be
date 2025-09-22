import { Test, TestingModule } from "@nestjs/testing";
import { JwtStrategy } from "@src/app/auth/admin.strategy";
import { AuthRepository } from "@src/app/auth/auth.repository";
import { DeviceRepository } from "@src/app/devices/devices.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, AuthRepository, JwtStrategy, DeviceRepository],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
