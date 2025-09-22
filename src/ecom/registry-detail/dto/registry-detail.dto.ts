import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseResponse } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { DomainEnum, RegistryDetailStatusEnum } from "@src/config";
import RegistryDetail from "@src/ecom/registry-detail/entities/registry-detail.entity";
import Registry from "@src/ecom/registry/entities/registry.entity";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegistryDetailFilter extends PaginationQuery {
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

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        nullable: true,
        name: "registryId",
        type: "string",
    })
    registryId: number;

    @IsOptional()
    @IsEnum(DomainEnum)
    @ApiPropertyOptional({
        nullable: true,
        name: "brandName",
        type: DomainEnum,
    })
    brandName: DomainEnum;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        nullable: true,
        name: "pinCode",
        type: "string",
    })
    pinCode: string;

    @IsOptional()
    @IsEnum(RegistryDetailStatusEnum)
    @ApiPropertyOptional({
        nullable: true,
        name: "status",
        type: RegistryDetailStatusEnum,
    })
    status: RegistryDetailStatusEnum;
}

export type RegistryDetailListResponse = BaseResponse<RegistryDetail[]> & {
    registry: Registry;
    itemPurchased: number;
    daysUntilEvent: number;
};
