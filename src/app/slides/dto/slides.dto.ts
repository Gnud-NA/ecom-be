import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class SlideFilter extends PaginationQuery {
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
        wfCode?: string;
        name?: string;
    };
    @ApiProperty({
        required: false,
    })
    wfCode?: string;
}
