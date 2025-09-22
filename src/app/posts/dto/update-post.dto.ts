import { ApiProperty, PartialType } from "@nestjs/swagger";
import Post from "@src/app/posts/entities/post.entity";
import { IsUniqueUpdateRequest } from "@src/validates/uniqueUpdateRequest.validator";
import { IsNotEmpty } from "class-validator";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    deleteCategoryIds: number[];

    @IsNotEmpty()
    @IsUniqueUpdateRequest("slug", Post)
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    slug: string;
}
