import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RewardEventTypeEnum } from "@src/config";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRewardEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Name",
        example: "Create an account",
        required: true,
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Description",
        example: "Description",
    })
    description: string;

    @IsNotEmpty()
    @IsEnum(RewardEventTypeEnum)
    @ApiProperty({
        description: "Type",
        example: RewardEventTypeEnum.CREATE_AN_ACCOUNT,
    })
    type: RewardEventTypeEnum;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Icon url",
        example: "https://example.com/icon.png",
    })
    iconUrl: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        description: "Media id",
        example: "123",
    })
    mediaId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Default point",
        example: 100,
    })
    defaultPoint: number;
}
