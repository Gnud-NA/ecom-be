import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RewardMilestoneStatusEnum } from "@src/config";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRewardMilestoneSettingDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Point threshold",
        example: 1,
        required: true,
    })
    pointThreshold: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Amount reward",
        example: 100,
        required: true,
    })
    amountReward: number;

    @Expose()
    @IsNotEmpty()
    @IsEnum(RewardMilestoneStatusEnum)
    @ApiProperty({
        description: "Status",
        example: RewardMilestoneStatusEnum.ACTIVE,
        required: true,
    })
    status: RewardMilestoneStatusEnum;

    @Expose()
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({
        description: "Priority",
        example: 2,
        required: false,
    })
    priority: number;

    @Expose()
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Description",
        example: "Description",
        required: false,
    })
    description: string;
}
