import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TierBenefitTypeEnum } from "@src/config";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTierBenefitDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Tier ID",
        example: 1,
        required: true,
    })
    tierId: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Benefit name",
        example: "Free shipping",
        required: true,
    })
    name: string;

    @Expose()
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Description",
        example: "Description",
    })
    description: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Point",
        example: 100,
    })
    point: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        description: "Priority",
        example: 2,
    })
    priority: number;

    @Expose()
    @IsNotEmpty()
    @IsEnum(TierBenefitTypeEnum)
    @ApiProperty({
        description: "Type",
        example: TierBenefitTypeEnum.CREATE_AN_ACCOUNT,
    })
    type: TierBenefitTypeEnum;
}
