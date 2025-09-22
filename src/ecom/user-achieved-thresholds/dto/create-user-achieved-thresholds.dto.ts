import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject } from "class-validator";

export class CreateUserAchievedThresholdsDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: "number",
        required: true,
        example: 1,
    })
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: "number",
        required: true,
        example: 1,
    })
    rewardMilestoneSettingId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: "decimal",
        required: true,
        example: 1000.23,
    })
    amount: number;

    @ApiProperty({
        type: "object",
        required: true,
        example: {},
    })
    @IsNotEmpty()
    @IsObject()
    metadata: Record<string, any>;
}
