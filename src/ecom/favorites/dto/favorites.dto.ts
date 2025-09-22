import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { DomainEnum } from "@src/config/auth";
import { IsEnum, IsOptional } from "class-validator";
export class FavoritesFilter extends PaginationQuery {
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

    @IsOptional()
    @ApiPropertyOptional({
        description: "The categoriy id",
        example: 1,
    })
    categoryId?: number;

    @IsOptional()
    @IsEnum(DomainEnum)
    @ApiPropertyOptional({
        description: "The brand name",
        example: DomainEnum.REMEMBER_NGUYEN,
    })
    brandName?: DomainEnum;
}
