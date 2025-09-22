import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "@src/app/auth/auth.repository";
import {
    ChangePasswordDto,
    ConfirmChangeEmailDto,
    LoginDto,
    RefreshTokenDto,
    RegisterDto,
    RequestChangeEmailDto,
    ResetPasswordByCodeDto,
    SendCodeDto,
    UpdateEcomUserDto,
    VerifyByCodeDto,
} from "@src/app/auth/dto/auth.dto";
import { Auth } from "@src/app/auth/entities/auth.entity";
import { DeviceRepository } from "@src/app/devices/devices.repository";
import { HelperService } from "@src/app/helper/helper.service";
import { EmailTemplate } from "@src/app/helper/template.email";
import User from "@src/app/users/entities/user.entity";
import { BaseService } from "@src/base";
import { ErrorCodeEnum, LoginTypeEnum, RoleEnum, TierTypeEnum } from "@src/config";
import { FavoritesRepository } from "@src/ecom/favorites/favorites.repository";
import { TierRepository } from "@src/ecom/tier/tier.repository";
import { HandleError } from "@src/utils";
import { HttpStatusCode } from "axios";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import moment = require("moment");
@Injectable()
export class AuthService extends BaseService<Auth, AuthRepository> {
    constructor(
        private readonly authRepo: AuthRepository,
        private readonly deviceRepo: DeviceRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
        @Inject(HelperService)
        private helperService: HelperService,
        private sequelize: Sequelize,
        @Inject(EmailTemplate) private emailTemplate: EmailTemplate,
        private favoriteRepo: FavoritesRepository,
        private tierRepo: TierRepository
    ) {
        super(authRepo);
    }

    async registerWithAdmin(registerDto: RegisterDto) {
        const password = await bcrypt.hash(registerDto.password, parseInt(this.configService.get("SALT_OR_ROUNDS")));
        if (password) {
            const user = await this.authRepo.create({
                ...registerDto,
                password,
                isVerify: true,
            });
            await user.$set("roles", RoleEnum.ADMIN);
            return user;
        }
        HandleError("register account is failed!", ErrorCodeEnum.BAD_REQUEST, 400);
    }

    async registerWithUser(registerDto: RegisterDto) {
        const username = registerDto.phone ?? registerDto?.email;
        if (!username) {
            HandleError("Email and phone are not empty!", 422, 422);
        }
        try {
            const user = await this.sequelize.transaction(async (t) => {
                const password = await bcrypt.hash(
                    registerDto.password,
                    parseInt(this.configService.get("SALT_OR_ROUNDS"))
                );
                const verifyCode = this.helperService.generateVerificationCode();
                const rememberToken = this.helperService.randomRememberToken();

                const initTier = await this.tierRepo.findOne({
                    where: { type: TierTypeEnum.CREATED_ACCOUNT },
                    order: [["level", "ASC"]],
                });

                if (password) {
                    const user = await this.authRepo.create({
                        ...registerDto,
                        password,
                        verifyCode,
                        rememberToken,
                        sendCodeAt: moment().toISOString(),
                        tierId: initTier?.id || null,
                    });
                    await user.$set("roles", RoleEnum.USER);
                    // TODO: Gửi mail ở môi trường prod
                    // if (registerDto?.phone) {
                    //     await this.helperService.sendSMSVerifyCode(registerDto.phone, String(verifyCode));
                    // } else {
                    //     if (registerDto.email) {
                    //         await this.helperService.sendEmailVerifyAccount(registerDto.email, String(verifyCode));
                    //     }
                    // }
                    return user;
                }
                HandleError("register account is failed!", ErrorCodeEnum.BAD_REQUEST, 400);
            });
            return user;
        } catch (err) {
            HandleError(err, ErrorCodeEnum.BAD_REQUEST, 400);
        }
    }

    async updateEcomUser(request: UpdateEcomUserDto, requesterId: number) {
        const user = await this.authRepo.findById(requesterId);
        if (!user) {
            HandleError("User not found!", 404, 404);
        }

        await user.update({
            ...user,
            ...request,
        });
        const newUser = await this.repository.findOne({
            where: { id: requesterId },
            hideColumns: true,
            attributes: {
                exclude: [
                    "password",
                    "isVerify",
                    "verifyCode",
                    "sendCodeAt",
                    "rememberToken",
                    "paymentCustomerId",
                    "deletedAt",
                ],
            },
        } as any);
        return newUser;
    }

    async requestChangeEmail(id: number, requestChangeEmailDto: RequestChangeEmailDto) {
        try {
            const user = await this.authRepo.findOne({ where: { id, email: requestChangeEmailDto.currentEmail } });
            if (!user) {
                HandleError("User not found!", 404, 404);
            }

            if (user.email !== requestChangeEmailDto.currentEmail) {
                HandleError("Current email is not correct!", 400, 400);
            }

            if (!user.isVerify) {
                HandleError("User is not verified!", 400, 400);
            }

            const rememberToken = this.helperService.randomRememberToken();

            await this.authRepo.updateById(user.id, {
                ...user,
                rememberToken,
            });
            const changeEmailUrl = `${this.configService.get(
                "WEB_APP_URL"
            )}/account/change-email?token=${rememberToken}`;
            const subject = "Confirm Your Email Change Request";
            const body = this.emailTemplate.requestChangeEmailTemplate(user, changeEmailUrl);

            await this.helperService.sendEmail({ to: user?.email, subject, htmlContent: body });

            return {
                success: true,
                message: `Confirmation email sent to ${user.email}`,
            };
        } catch (error) {
            throw error;
        }
    }

    async confirmChangeEmail(id: number, confirmChangeEmailDto: ConfirmChangeEmailDto) {
        const user = await this.authRepo.findOne({
            where: { id, email: confirmChangeEmailDto.currentEmail, rememberToken: confirmChangeEmailDto.token },
        });
        if (!user) {
            HandleError("Bad request!", HttpStatusCode.BadRequest, HttpStatusCode.BadRequest);
        }

        if (user.email === confirmChangeEmailDto.newEmail) {
            HandleError(
                "New email is the same as the current email!",
                HttpStatusCode.BadRequest,
                HttpStatusCode.BadRequest
            );
        }

        await this.authRepo.updateById(user.id, {
            ...user,
            email: confirmChangeEmailDto.newEmail,
            rememberToken: null,
        });

        return {
            success: true,
            message: "Email changed successfully!",
        };
    }

    async login(request: LoginDto) {
        const { email, password, type, deviceUuid } = request;
        const user = await this.validateAdmin(email, password);
        const payload = { email: user?.email ?? email, userId: user?.id };

        if (!user) {
            HandleError("email or password is invalid!", ErrorCodeEnum.UNAUTHORIZED, 401);
        }
        const accessToken = await this.generateAccessToken(payload);
        const refreshToken = await this.generateRefreshToken(payload);

        await this.deviceRepo.create({
            userId: user.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            type: type ?? LoginTypeEnum.WEB,
            deviceUuid: deviceUuid ?? undefined,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async loginByUserRole(request: LoginDto) {
        const { email, phone, password, type, deviceUuid } = request;
        console.log("email: ", email);
        console.log("pw: ", password);
        const user = await this.validateUser(phone ?? email, password);
        const payload = { phone: user?.phone, email: user?.email ?? email, userId: user?.id };

        if (!user) {
            HandleError("email or password is invalid!", ErrorCodeEnum.UNAUTHORIZED, 401);
        }
        if (!user.isVerify) {
            HandleError("The account has not been verified!", ErrorCodeEnum.UNAUTHORIZED, 403);
        }
        const accessToken = await this.generateAccessToken(payload);
        const refreshToken = await this.generateRefreshToken(payload);

        await this.deviceRepo.create({
            userId: user.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            type: type ?? LoginTypeEnum.WEB,
            deviceUuid: deviceUuid ?? undefined,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(request: RefreshTokenDto) {
        const { accessToken, refreshToken, type, deviceUuid } = request;
        const device = await this.deviceRepo.findOne({
            where: {
                accessToken,
                refreshToken,
            },
            include: [{ model: User }],
        });

        if (!device) {
            HandleError("Unauthorized!", ErrorCodeEnum.UNAUTHORIZED, 401);
        }

        const payload = { email: device?.user?.email, userId: device?.user?.id };
        const newAccessToken = await this.generateAccessToken(payload);
        const newRefreshToken = await this.generateRefreshToken(payload);
        const [del, res] = await Promise.all([
            this.deviceRepo.delete(device.id),
            this.deviceRepo.create({
                userId: device.userId,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                type: type ?? device?.type ?? LoginTypeEnum.WEB,
                deviceUuid: deviceUuid ?? device?.deviceUuid ?? undefined,
            }),
        ]);
        if (!res) {
            HandleError("Unauthorized!!!", ErrorCodeEnum.UNAUTHORIZED, 401);
        }
        return {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
        };
    }

    async validateAdmin(email: string, password: string) {
        try {
            const user = await this.authRepo.findOne({
                where: { [Op.or]: [{ email }, { username: email }] },
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
            if (user) {
                const isMatch = await bcrypt.compare(password, user?.password);
                if (isMatch) {
                    const { password, ...result } = user;
                    return result;
                }
            }
        } catch (e) {
            // console.log(e);
        }
        return null;
    }

    async validateUser(email: string, password: string) {
        try {
            console.log("HERE");
            const user = await this.authRepo.findOne({
                where: { [Op.or]: [{ email }, { username: email }, { phone: email }] },
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

            console.log("USER: ", user);

            if (user) {
                const isMatch = await bcrypt.compare(password, user?.password);
                if (isMatch) {
                    const { password, ...result } = user;
                    return result;
                }
            }
        } catch (e) {
            // console.log(e, "eeeeee");
        }
        return null;
    }

    async generateAccessToken(payload: any): Promise<string> {
        const expiresIn = this.configService.get("JWT_ACCESS_TOKEN_EXPIRED_IN");
        const secret = this.configService.get("JWT_SECRET");
        const token = await this.jwtService.signAsync(payload, {
            secret,
            expiresIn,
        });
        return token;
    }
    async generateRefreshToken(payload: any): Promise<string> {
        const expiresIn = this.configService.get("JWT_EXPIRED_IN");
        const secret = this.configService.get("JWT_SECRET");
        const token = await this.jwtService.signAsync(payload, {
            secret,
            expiresIn,
        });
        return token;
    }

    async findOne(id: number): Promise<User> {
        return this.repository.findOne({ where: { id }, hideColumns: true } as any);
    }

    async findProfile(id: number): Promise<User & { favoriteCount: number }> {
        const favoriteCount = await this.favoriteRepo.count({ where: { userId: id } });
        const user = await this.repository.findOne({ where: { id }, hideColumns: true } as any);

        return {
            ...user,
            favoriteCount,
        } as any;
    }

    async sendVerifyCode(sendCodeDto: SendCodeDto) {
        const username = sendCodeDto.phone ?? sendCodeDto?.email;
        if (!username) {
            HandleError("Email and phone are not empty!", 422, 422);
        }
        try {
            const user = await this.authRepo.findOne({
                where: { [Op.or]: [{ email: username }, { username }, { phone: username }] },
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
            if (user) {
                if (this.helperService.isCodeSentWithin5Minutes(user?.sendCodeAt)) {
                    HandleError("Code sent within 5 minutes!1", 429, 429);
                }
                const verifyCode = this.helperService.generateVerificationCode();
                await this.authRepo.updateById(user?.id, { verifyCode, sendCodeAt: moment().toISOString() });
                if (sendCodeDto?.phone) {
                    await this.helperService.sendSMSVerifyCode(sendCodeDto.phone, String(verifyCode));
                } else {
                    if (sendCodeDto.email) {
                        await this.helperService.sendEmailVerifyAccount(sendCodeDto.email, String(verifyCode));
                    }
                }
                return true;
            }
            HandleError("Email and phone has not exists!", 404, 404);
        } catch (e) {
            throw e;
        }
    }

    async verifyAccountByCode(request: VerifyByCodeDto) {
        const username = request.phone ?? request?.email;
        if (!username) {
            HandleError("Email and phone are not empty!", 422, 422);
        }
        try {
            const user = await this.authRepo.findOne({
                where: { [Op.or]: [{ email: username }, { username }, { phone: username }] },
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
            if (user) {
                if (user?.verifyCode !== request?.verifyCode) {
                    HandleError("Verify Code invalid!", 400, 400);
                }

                if (!this.helperService.isCodeSentWithin5Minutes(user?.sendCodeAt)) {
                    HandleError("Verify Code expired!", 400, 400);
                }

                await this.authRepo.updateById(user?.id, { isVerify: true });

                // login
                const userVerify = await this.authRepo.findById(user?.id);

                const payload = { phone: userVerify?.phone, email: userVerify?.email, userId: user?.id };
                const accessToken = await this.generateAccessToken(payload);
                const refreshToken = await this.generateRefreshToken(payload);

                await this.deviceRepo.create({
                    userId: user.id,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    type: LoginTypeEnum.WEB,
                    deviceUuid: undefined,
                });

                return {
                    accessToken,
                    refreshToken,
                };
            }
            HandleError("Email and phone has not exists!", 404, 404);
        } catch (e) {
            throw e;
        }
    }

    async sendForgetPasswordCode(sendCodeDto: SendCodeDto) {
        const username = sendCodeDto.phone ?? sendCodeDto?.email;
        if (!username) {
            HandleError("Email and phone are not empty!", 422, 422);
        }
        try {
            const user = await this.authRepo.findOne({
                where: { [Op.or]: [{ email: username }, { username }, { phone: username }] },
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
            if (user) {
                if (this.helperService.isCodeSentWithin5Minutes(user?.sendCodeAt)) {
                    HandleError("Code sent within 5 minutes!1", 429, 429);
                }
                const verifyCode = this.helperService.generateVerificationCode();
                await this.authRepo.updateById(user?.id, { verifyCode, sendCodeAt: moment().toISOString() });
                if (sendCodeDto?.phone) {
                    await this.helperService.sendSMSForgetPasswordCode(sendCodeDto.phone, String(verifyCode));
                } else {
                    if (sendCodeDto.email) {
                        await this.helperService.sendEmailForgetPasswordAccount(sendCodeDto.email, String(verifyCode));
                    }
                }
                return true;
            }
            HandleError("Email and phone has not exists!", 404, 404);
        } catch (e) {
            throw e;
        }
    }

    async resetPasswordByCode(request: ResetPasswordByCodeDto) {
        const username = request.phone ?? request?.email;
        if (!username) {
            HandleError("Email and phone are not empty!", 422, 422);
        }
        if (request.newPassword !== request.confirmNewPassword) {
            HandleError("Confirm new password do not match!", 400, 400);
        }
        try {
            const user = await this.authRepo.findOne({
                where: { [Op.or]: [{ email: username }, { username }, { phone: username }] },
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
            if (user) {
                if (user?.verifyCode !== request?.verifyCode) {
                    HandleError("Verify Code invalid!", 400, 400);
                }

                if (!this.helperService.isCodeSentWithin5Minutes(user?.sendCodeAt)) {
                    HandleError("Verify Code expired!", 400, 400);
                }

                const newPassword = await bcrypt.hash(
                    request.newPassword,
                    parseInt(this.configService.get("SALT_OR_ROUNDS"))
                );
                await this.authRepo.updateById(user?.id, { password: newPassword });
                return true;
            }
            HandleError("Email and phone has not exists!", 404, 404);
        } catch (e) {
            throw e;
        }
    }

    async changePassword(userId: number, bodyRequest: ChangePasswordDto) {
        const user = await this.authRepo.findOne({ where: { id: userId } });
        if (!user) {
            HandleError("User not found!", 404, 404);
        }

        const isMatch = await bcrypt.compare(bodyRequest.currentPassword, user?.password);
        if (!isMatch) {
            HandleError("Cannot change password!", 400, 400);
        }

        const newPassword = await bcrypt.hash(
            bodyRequest.newPassword,
            parseInt(this.configService.get("SALT_OR_ROUNDS"))
        );

        await this.authRepo.updateById(userId, { password: newPassword });
        return true;
    }
}
