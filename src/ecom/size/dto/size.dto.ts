import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "../../../base/dto/filter.dto";

export class FilterSizeDto extends PaginationQuery {
    @ApiProperty({
        nullable: true,
        name: "query",
        type: "object",
        properties: {
            where: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                    },
                },
            },
        },
    })
    where?: {
        id?: number;
    };
}
