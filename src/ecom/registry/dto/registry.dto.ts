import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "@src/base/dto/filter.dto";

export class RegistryFilter extends PaginationQuery {
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

    @ApiProperty({
        nullable: true,
        name: "year",
        type: "number",
    })
    year?: number;

    @ApiProperty({
        nullable: true,
        name: "month",
        type: "number",
    })
    month?: number;

    @ApiProperty({
        nullable: true,
        name: "search",
        type: "string",
    })
    search?: string;

    @ApiProperty({
        nullable: true,
        name: "firstName",
        type: "string",
    })
    firstName?: string;

    @ApiProperty({
        nullable: true,
        name: "lastName",
        type: "string",
    })
    lastName?: string;

    @ApiProperty({
        nullable: true,
        name: "state",
        type: "string",
    })
    state?: string;
}
