import { ApiProperty } from "@nestjs/swagger";
import { DomainEnum } from "@src/config";
import { PaginationQuery } from "../../../base/dto/filter.dto";

export class EcomCategoryFilter extends PaginationQuery {
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
        id?: number | any;
    };

    @ApiProperty({
        nullable: false,
        name: "brandName",
        enum: Object.keys(DomainEnum),
    })
    brandName?: DomainEnum;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    minPrice?: number;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    maxPrice?: number;

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    colorIds?: number[];

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    sizeIds?: number[];
}
