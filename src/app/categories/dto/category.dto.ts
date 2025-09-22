import { ApiProperty } from "@nestjs/swagger";
import { PostTypeEnum } from "@src/config";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class CategoryFilter extends PaginationQuery {
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
        id?: number | any;
    };
    @ApiProperty({
        enum: PostTypeEnum,
        required: true,
    })
    postType?: PostTypeEnum;
}
