import { ApiProperty, PartialType } from "@nestjs/swagger";
import Category from "@src/app/categories/entities/category.entity";
import { PostTypeEnum } from "@src/config";
import { IsUniqueUpdateRequest } from "@src/validates/uniqueUpdateRequest.validator";
import { IsNotEmpty, MaxLength } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @MaxLength(256)
    @IsUniqueUpdateRequest("slug", Category)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "slug",
        type: "string",
    })
    slug: string;
}

export class UpdateCategoryPriority {
    @IsNotEmpty()
    @ApiProperty({
        name: "newOrder",
        type: "number",
    })
    newOrder: number;

    @IsNotEmpty()
    @ApiProperty({
        name: "postType",
        type: "string",
        enum: PostTypeEnum,
    })
    postType: PostTypeEnum;
}
