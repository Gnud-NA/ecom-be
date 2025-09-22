import { ApiProperty } from "@nestjs/swagger";
import { DomainEnum } from "@src/config";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class FilterProductDto extends PaginationQuery {
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

    // @ApiProperty({
    //     enum: ProductTypeEnum,
    //     required: true,
    // })
    // postType?: ProductTypeEnum;

    @ApiProperty({
        type: "string",
        required: false,
    })
    search?: string;

    @ApiProperty({
        type: "number",
        required: false,
    })
    categoryId?: number;

    @ApiProperty({
        type: "number",
        required: false,
    })
    minPrice?: number;

    @ApiProperty({
        type: "number",
        required: false,
    })
    maxPrice?: number;

    @ApiProperty({
        type: "array",
        items: {
            type: "number",
        },
        required: false,
    })
    colorIds?: number[];

    @ApiProperty({
        type: "array",
        items: {
            type: "number",
        },
        required: false,
    })
    sizeIds?: number[];

    @ApiProperty({
        type: "enum",
        enum: Object.keys(DomainEnum),
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    brandName?: DomainEnum;
}
