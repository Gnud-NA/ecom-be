import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthRepository } from "@src/app/auth/auth.repository";
import { RoleEnum } from "@src/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Op } from "sequelize";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, "jwt-admin") {
    constructor(
        private authRepo: AuthRepository,
        // private jwtService: JwtService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET"),
        });
    }

    async validate(payload: any) {
        const { userId } = payload;
        const user = await this.authRepo.findOne({
            where: { email: payload.email },
            include: [
                {
                    association: "roles",
                    required: true,
                    where: {
                        [Op.or]: [{ id: RoleEnum.ADMIN }, { id: RoleEnum.SUPPER_ADMIN }],
                    },
                },
            ],
        });

        if (!user) {
            return false;
        }
        return { userId: payload.userId, email: payload.email };
    }
}
