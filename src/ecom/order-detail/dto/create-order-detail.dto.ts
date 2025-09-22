import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDetailDto {
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    productId: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    quantity: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    price: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    size: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    color: string;
}
