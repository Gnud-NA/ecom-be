import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class CollectionFilter extends PaginationQuery {
    @ApiProperty({
        nullable: true,
        name: "where",
        type: "object",
        properties: {
            id: {
                type: "number",
            },
        },
        description: `example: {where:{"id":1}}`,
    })
    where?: {
        id?: number;
        parentId?: number | string;
        name?: string;
    };
    // @ApiProperty({
    //     enum: PostTypeEnum,
    //     required: true,
    // })
    // postType?: PostTypeEnum;
}
