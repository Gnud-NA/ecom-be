import { ApiProperty } from "@nestjs/swagger";
import Post from "@src/app/posts/entities/post.entity";
import { IsUnique } from "@src/validates/unique.validator";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @ApiProperty({
        name: "status",
        nullable: true,
        type: "boolean",
    })
    status: boolean;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    title: string;

    @IsNotEmpty()
    @IsUnique("slug", Post)
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    slug: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    thumbnail: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    mediaId: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    description: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    content: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    video: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    priority: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    postType: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    tags: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoTitle: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoDescription: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoKeyword: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoLocation: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "number",
    })
    userId: number;

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    categoryIds: number[];

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    phone: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    email: string;
}
