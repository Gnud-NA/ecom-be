import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "@src/base/dto/filter.dto";

export class MenuDetailFilter extends PaginationQuery {
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
        required: true,
    })
    menuId?: number;
}
