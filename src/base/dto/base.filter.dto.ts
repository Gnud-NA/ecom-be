import { ApiProperty } from "@nestjs/swagger";
import { FindOptions } from "sequelize";
import { BaseFilter } from "../base.interface";

export class BaseFilterDto implements Partial<BaseFilter & FindOptions> {
    @ApiProperty()
    where?: any;

    @ApiProperty({
        name: "limit",
        default: 10,
        required: false,
    })
    limit?: number;

    @ApiProperty()
    offset?: number;

    @ApiProperty({
        nullable: true,
        name: "orderBy",
        type: "object",
        properties: {
            column: { type: "string" },
            order: { type: "string" },
        },
        isArray: true,
        description: `Object type is: [{ column:  "string", order: "string"}]`,
    })
    orderBy?: any[];
}
