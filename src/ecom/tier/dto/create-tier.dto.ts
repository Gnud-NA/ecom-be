import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TierTypeEnum } from "@src/config";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTierDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Name",
        example: "Tier 1",
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
    @IsEnum(TierTypeEnum)
    @ApiProperty({
        description: "Type",
        example: TierTypeEnum.CREATED_ACCOUNT,
    })
    type: TierTypeEnum;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        description: "Spend required",
        example: 100,
    })
    spendRequired: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Level",
        example: 1,
    })
    level: number;
}
