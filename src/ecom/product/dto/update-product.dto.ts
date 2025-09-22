import { ApiProperty, PartialType } from "@nestjs/swagger";
import Product from "@src/ecom/product/entities/product.entity";
import { IsUniqueUpdateRequest } from "@src/validates/uniqueUpdateRequest.validator";
import { IsNotEmpty } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    deleteCategoryIds: number[];

    @IsNotEmpty()
    @IsUniqueUpdateRequest("slug", Product)
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    slug: string;

    @IsNotEmpty()
    @IsUniqueUpdateRequest("productCode", Product)
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    productCode: string;
}
