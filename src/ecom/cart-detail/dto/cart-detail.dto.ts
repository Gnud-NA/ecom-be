import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CartDetailDto {
    @ApiProperty({
        nullable: true,
        name: "query",
        type: "object",
        properties: {
            where: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
        },
    })
    where?: {
        id?: number;
    };
}

export class CreateCartDetailDto {
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    colorId: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    sizeId: number;

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
}
