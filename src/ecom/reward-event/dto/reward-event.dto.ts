import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "@src/base/dto/filter.dto";

export class RewardEventFilter extends PaginationQuery {
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
