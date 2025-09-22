import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFavoritesDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Product ID",
        example: 1,
    })
    productId: number;
}
