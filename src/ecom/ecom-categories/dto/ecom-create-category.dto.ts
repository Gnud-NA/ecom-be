import { ApiProperty } from "@nestjs/swagger";
import Category from "@src/app/categories/entities/category.entity";
import { IsUnique } from "@src/validates/unique.validator";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateEcomCategoryDto {
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "name",
        type: "string",
    })
    name: string;

    @MaxLength(256)
    @IsUnique("slug", Category)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "slug",
        type: "string",
    })
    slug: string;

    @ApiProperty({
        nullable: false,
        name: "description",
        type: "string",
    })
    description: string;

    @ApiProperty({
        nullable: false,
        name: "content",
        type: "string",
    })
    content: string;

    @ApiProperty({
        nullable: false,
        name: "icon",
        type: "string",
    })
    icon: string;

    @ApiProperty({
        nullable: false,
        name: "image",
        type: "string",
    })
    image: string;

    @ApiProperty({
        nullable: false,
        name: "wfCode",
        type: "string",
    })
    wfCode: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "status",
        type: "boolean",
        default: false,
    })
    status: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    parentId?: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    userId: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    mediaId: number;
}
