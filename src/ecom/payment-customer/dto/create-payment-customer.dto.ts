import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePaymentCustomerDto {
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    hexCode: string;
}
