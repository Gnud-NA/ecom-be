import { ApiProperty } from "@nestjs/swagger";
import { CreateCartDetailDto } from "@src/ecom/cart-detail/dto/cart-detail.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class CreateOrUpdateCartDto {
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    totalQuantity: number;

    @ApiProperty({
        nullable: false,
        type: "string",
    })
    giftCode: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    note: string;

    @ApiProperty({
        description: "Details of the cart",
        type: CreateCartDetailDto,
        isArray: true,
    })
    @ValidateNested({ each: true })
    @Type(() => CreateCartDetailDto)
    cartDetails: CreateCartDetailDto[];
}
