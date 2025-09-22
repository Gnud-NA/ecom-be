import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import User from "@src/app/users/entities/user.entity";
import { LoginTypeEnum } from "@src/config";
import { IsUnique } from "@src/validates/unique.validator";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
// import { Unique } from "sequelize-typescript";

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        type: "string",
        name: "email",
        example: "string@gmail.com",
    })
    email: string;

    // @IsEmail()
    @ApiProperty({
        type: "string",
        name: "phone",
    })
    phone: string;

    @MinLength(6)
    @ApiProperty({
        type: "string",
        name: "password",
        example: "string",
    })
    password: string;

    @ApiProperty()
    type?: LoginTypeEnum;

    @ApiProperty()
    deviceUuid?: string;
}

export class RegisterDto {
    @IsUnique("email", User)
    @IsOptional()
    @IsEmail()
    @ApiProperty({
        nullable: true,
        name: "email",
        type: "string",
    })
    email: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        nullable: true,
        type: "date",
    })
    dateOfBirth: Date;

    @ApiProperty({
        nullable: true,
        name: "phone",
        type: "string",
    })
    phone: string;

    @ApiProperty({
        type: "string",
    })
    countryCallingCode: string;

    @IsUnique("phoneNumber", User)
    @ApiProperty({
        type: "string",
    })
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @MinLength(6)
    password: string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    lastName: string;
}

export class UpdateEcomUserDto extends PickType(RegisterDto, ["dateOfBirth", "firstName", "lastName"]) {}

export class ConfirmChangeEmailDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        type: "string",
        name: "newEmail",
        nullable: false,
    })
    newEmail: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        type: "string",
        name: "currentEmail",
        nullable: false,
    })
    currentEmail: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: "string",
        name: "token",
        nullable: false,
    })
    token: string;
}

export class RefreshTokenDto {
    @IsNotEmpty()
    @ApiProperty({
        type: "string",
    })
    accessToken: string;

    @IsNotEmpty()
    @ApiProperty({
        type: "string",
    })
    refreshToken: string;

    @ApiProperty()
    type?: LoginTypeEnum;

    @ApiProperty()
    deviceUuid?: string;
}

export class SendCodeDto {
    @IsOptional()
    @IsEmail({})
    @ApiProperty({
        nullable: true,
        name: "email",
        type: "string",
    })
    email: string;

    @ApiProperty({
        nullable: true,
        name: "phone",
        type: "string",
    })
    phone: string;
}

export class VerifyByCodeDto {
    @IsOptional()
    @IsEmail({})
    @ApiProperty({
        nullable: true,
        name: "email",
        type: "string",
    })
    email: string;

    @ApiProperty({
        nullable: true,
        name: "phone",
        type: "string",
    })
    phone: string;

    @ApiProperty({
        nullable: false,
        type: "string",
    })
    verifyCode: string;
}

export class ResetPasswordByCodeDto {
    @IsOptional()
    @IsEmail({})
    @ApiProperty({
        nullable: true,
        name: "email",
        type: "string",
    })
    email: string;

    @ApiProperty({
        nullable: true,
        name: "phone",
        type: "string",
    })
    phone: string;

    @ApiProperty({
        nullable: false,
        type: "string",
    })
    verifyCode: string;

    @ApiProperty({
        nullable: false,
        type: "string",
    })
    newPassword: string;

    @ApiProperty({
        nullable: false,
        type: "string",
    })
    confirmNewPassword: string;
}

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: "string",
        name: "currentPassword",
        nullable: false,
    })
    currentPassword: string;

    @ApiProperty({
        type: "string",
        name: "newPassword",
        nullable: false,
    })
    newPassword: string;
}

export class RequestChangeEmailDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        type: "string",
        name: "currentEmail",
        nullable: false,
    })
    currentEmail: string;
}
