import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthRepository } from "@src/app/auth/auth.repository";
import { RoleEnum } from "@src/config";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, "jwt-user") {
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
        const { userId, email } = payload;
        const user = await this.authRepo.findOne({
            where: { email: payload.email },
            include: [
                {
                    association: "roles",
                    required: true,
                    where: {
                        id: RoleEnum.USER,
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
