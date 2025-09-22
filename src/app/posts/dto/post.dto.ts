import { ApiProperty } from "@nestjs/swagger";
import { ContactTypeEnum, PostTypeEnum } from "@src/config";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class FilterPostDto extends PaginationQuery {
    @ApiProperty({
        nullable: true,
        name: "where",
        type: "object",
        properties: {
            id: {
                type: "number",
            },
        },
    })
    where?: {
        id?: number;
        status?: boolean;
    };

    @ApiProperty({
        enum: PostTypeEnum,
        required: true,
    })
    postType?: PostTypeEnum;

    @ApiProperty({
        type: "string",
        required: false,
    })
    search?: string;

    @ApiProperty({
        type: "number",
        required: false,
    })
    categoryId?: number;

    @ApiProperty({
        enum: ContactTypeEnum,
        required: false,
    })
    contactType?: ContactTypeEnum;
}
