import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class MenuFilter extends PaginationQuery {
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
    };

    @ApiProperty({
        required: false,
    })
    wfCode?: string;
}

export class BaseMenuFilter extends PaginationQuery {
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
    };
}
