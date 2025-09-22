import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class SlideDetailFilter extends PaginationQuery {
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
        slideId?: number;
        name?: string;
    };

    @ApiProperty({
        required: false,
    })
    slideId?: string;
}
