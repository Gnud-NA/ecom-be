import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ContactTypeEnum, DomainEnum, PostTypeEnum } from "@src/config";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class FilterPostByCategorySlugDto extends PaginationQuery {
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
        enum: PostTypeEnum,
        required: true,
    })
    postType?: PostTypeEnum;
}

export class FilterPostListByPostTypeDto extends PaginationQuery {
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
        enum: PostTypeEnum,
        required: true,
    })
    postType?: PostTypeEnum;

    @ApiProperty({
        nullable: true,
        enum: ContactTypeEnum,
    })
    contactType?: ContactTypeEnum;
}

export class CreateContactPostDto {
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        enum: ContactTypeEnum,
    })
    contactType: ContactTypeEnum;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    title: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    description: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    content: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    phone: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    email: string;
}

export class CreateContactQnaPostDto {
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    content: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    email: string;
}

export class FilterDetailDto extends PaginationQuery {
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
                    brandName: {
                        type: "string",
                    },
                },
            },
        },
    })
    where?: {
        id?: number;
        brandName?: string;
    };

    @ApiProperty({
        nullable: true,
        enum: Object.keys(DomainEnum),
        name: "brandName",
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    brandName: DomainEnum;

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
        type: "number",
        required: false,
    })
    userId?: number;
}
export class FilterAllSlugDto {
    @ApiProperty({
        nullable: false,
        enum: Object.keys(DomainEnum),
        name: "brandName",
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    brandName: DomainEnum;
}
export class SubcribeDto {
    @ApiProperty({
        nullable: false,
        name: "email",
    })
    email: string;
}

export class FilterProductByCategorySlugDto extends PaginationQuery {
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
export class FilterProductByCategoryWfcodeDto extends PaginationQuery {
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
        type: "string",
        required: true,
    })
    wfCode?: string;
}

export class FilterFindVoucherDto {
    // @ApiProperty({
    //     nullable: true,
    //     name: "query",
    //     type: "object",
    //     properties: {
    //         where: {
    //             type: "object",
    //             properties: {
    //                 id: {
    //                     type: "number",
    //                 },
    //             },
    //         },
    //     },
    // })
    // where?: {
    //     id?: number;
    // };

    @ApiProperty({
        type: "string",
        required: true,
    })
    code: string;
}

export class FilterSearchProductDto extends PaginationQuery {
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
        type: "boolean",
        required: false,
    })
    isHasColor?: boolean;

    @ApiProperty({
        type: "boolean",
        required: false,
    })
    isHasSize?: boolean;

    @ApiProperty({
        type: "enum",
        enum: Object.keys(DomainEnum),
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    brandName?: DomainEnum;
}

export class LockMembershipDto {
    @ApiPropertyOptional({
        type: "string",
        required: false,
    })
    reasonMembershipLock: string;

    @ApiProperty({
        type: "boolean",
        required: true,
    })
    @IsBoolean()
    membershipActive: boolean;
}

export class ClaimRewardDto {}
