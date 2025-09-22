import { ApiProperty, PartialType } from "@nestjs/swagger";
import EcomCategory from "@src/ecom/ecom-categories/entities/ecom-category.entity";
import { IsUniqueUpdateRequest } from "@src/validates/uniqueUpdateRequest.validator";
import { IsNotEmpty, MaxLength } from "class-validator";
import { CreateEcomCategoryDto } from "./ecom-create-category.dto";

export class UpdateEcomCategoryDto extends PartialType(CreateEcomCategoryDto) {
    @MaxLength(256)
    @IsUniqueUpdateRequest("slug", EcomCategory)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "slug",
        type: "string",
    })
    slug: string;
}

export class UpdateEcomCategoryPriority {
    @IsNotEmpty()
    @ApiProperty({
        name: "newOrder",
        type: "number",
    })
    newOrder: number;
}
