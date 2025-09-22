import { ApiProperty } from "@nestjs/swagger";
import { DomainEnum } from "@src/config";

export class FilterSettingDto {
    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(DomainEnum),
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    domain?: string;
}
export class UpdateSettingDto {
    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(DomainEnum),
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    domain?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    title?: string;

    @ApiProperty({
        nullable: true,
        type: "boolean",
    })
    isMaintain?: boolean;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    keyword?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    description?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    logo?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    subLogo?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    favicon?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    googleAnalytic?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    fanpage?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    footerDescription?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    googleLink?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    facebookLink?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    pinterestLink?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    twitterLink?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    slogan?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    email?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    mobile?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    phone?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    address?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    youtubeLink?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    youtubeChannel?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    zalo?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    skype?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    telegramChatId?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    telegramBotToken?: string;
}
