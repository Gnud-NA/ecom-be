import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "@src/app/auth/admin.guard";
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
import { UserGuard } from "@src/app/auth/user.guard";
import { RequestWithAuth } from "@src/base";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@ApiBearerAuth()
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(AdminGuard)
    @Post("/register")
    create(@Body() request: RegisterDto) {
        return this.authService.registerWithAdmin(request);
    }

    @Post("/login")
    login(@Body() request: LoginDto) {
        return this.authService.login(request);
    }

    @UseGuards(AdminGuard)
    @Post("/refresh-token")
    refreshToken(@Body() request: RefreshTokenDto) {
        return this.authService.refreshToken(request);
    }

    @UseGuards(AdminGuard)
    @Get("/profile")
    getProfile(@Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;
        return this.authService.findOne(userId);
    }

    @UseGuards(AdminGuard)
    @Post("/admin-login")
    loginAdmin(@Body() request: LoginDto) {
        return "sdsd";
    }

    /**
     * api ecommerce ----------------------------------------------------------------
     */

    @Post("/ecom/login")
    loginEcom(@Body() request: LoginDto) {
        return this.authService.loginByUserRole(request);
    }

    @Post("/ecom/register")
    createEcom(@Body() request: RegisterDto) {
        return this.authService.registerWithUser(request);
    }

    @UseGuards(UserGuard)
    @Patch("/ecom/update-profile")
    updateEcomUser(@Body() request: UpdateEcomUserDto, @Req() req: RequestWithAuth) {
        const userId = req?.auth?.userId;
        return this.authService.updateEcomUser(request, userId);
    }

    @UseGuards(UserGuard)
    @Post("/ecom/change-email/request")
    requestChangeEmail(@Req() request: RequestWithAuth, @Body() requestChangeEmailDto: RequestChangeEmailDto) {
        const userId = request?.auth?.userId;
        return this.authService.requestChangeEmail(userId, requestChangeEmailDto);
    }

    @UseGuards(UserGuard)
    @Patch("/ecom/change-email/confirm")
    confirmChangeEmail(@Body() confirmChangeEmailDto: ConfirmChangeEmailDto, @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;
        return this.authService.confirmChangeEmail(userId, confirmChangeEmailDto);
    }

    @UseGuards(UserGuard)
    @Get("/ecom/profile")
    getProfileEcom(@Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;

        return this.authService.findProfile(userId);
    }

    @Post("/ecom/send-verify-code")
    sendVerifyCode(@Body() request: SendCodeDto) {
        return this.authService.sendVerifyCode(request);
    }

    @Post("/ecom/verify-by-code")
    verifyAccountByCode(@Body() request: VerifyByCodeDto) {
        return this.authService.verifyAccountByCode(request);
    }

    @Post("/ecom/send-forget-password-code")
    sendForgetPasswordCode(@Body() request: SendCodeDto) {
        return this.authService.sendForgetPasswordCode(request);
    }

    @Post("/ecom/reset-password-by-code")
    resetPasswordByCode(@Body() request: ResetPasswordByCodeDto) {
        return this.authService.resetPasswordByCode(request);
    }

    @UseGuards(UserGuard)
    @Patch("/ecom/change-password")
    changePassword(@Body() bodyRequest: ChangePasswordDto, @Req() request: RequestWithAuth) {
        const userId = request?.auth?.userId;
        return this.authService.changePassword(userId, bodyRequest);
    }
}
