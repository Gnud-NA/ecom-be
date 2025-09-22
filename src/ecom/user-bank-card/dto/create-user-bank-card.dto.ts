import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserBankCardDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Payment method id",
        example: "pm_123456789",
    })
    paymentMethodId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Brand",
        example: "Visa",
    })
    brand: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Last 4 digits",
        example: "1234",
    })
    last4: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Exp month",
        example: 1,
    })
    expMonth: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Exp year",
        example: 2025,
    })
    expYear: number;
}
