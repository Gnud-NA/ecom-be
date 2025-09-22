import { Test, TestingModule } from "@nestjs/testing";
import { JwtStrategy } from "@src/app/auth/admin.strategy";
import { AuthRepository } from "@src/app/auth/auth.repository";
import { DeviceRepository } from "@src/app/devices/devices.repository";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, AuthRepository, JwtStrategy, DeviceRepository],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
