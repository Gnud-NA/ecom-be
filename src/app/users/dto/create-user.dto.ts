import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { Unique } from "typeorm";
import { User } from "../entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Validate(Unique, [User])
    @ApiProperty({
        nullable: false,
        name: "email",
        type: "string",
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
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

export class RegisterUserDto {
    @IsEmail()
    @Validate(Unique, [User])
    @ApiProperty({
        nullable: true,
        name: "email",
        type: "string",
    })
    email: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(Unique, [User])
    @ApiProperty({
        nullable: true,
        name: "email",
        type: "number",
    })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
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
