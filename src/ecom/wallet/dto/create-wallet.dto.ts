import { ApiProperty } from "@nestjs/swagger";
import { EcomWalletTypeEnum } from "@src/config";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateWalletDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "User ID",
        example: 1,
        required: true,
    })
    userId: number;

    @Expose()
    @IsNotEmpty()
    @IsEnum(EcomWalletTypeEnum)
    @ApiProperty({
        description: "Type",
        example: EcomWalletTypeEnum.REWARD,
        required: true,
    })
    type: EcomWalletTypeEnum;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Total amount",
        example: 100,
        required: true,
    })
    totalAmount: number;
}
