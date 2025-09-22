import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { DomainEnum, ProductDiscountTypeEnum } from "@src/config";
import Product from "@src/ecom/product/entities/product.entity";
import { IsUnique } from "@src/validates/unique.validator";
import { IsNotEmpty } from "class-validator";

export class ProductGalleryDto {
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    mediaId: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    colorId: number;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    url: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    code: string;
}

@ApiExtraModels(ProductGalleryDto)
export class CreateProductDto {
    @IsNotEmpty()
    @IsUnique("slug", Product)
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    slug: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    productName: string;

    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(DomainEnum),
        default: DomainEnum.REMEMBER_NGUYEN,
    })
    brandName: DomainEnum;

    @IsUnique("productCode", Product)
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    productCode?: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    basePrice: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    showPrice: number;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    discountType: ProductDiscountTypeEnum;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    discountAmount: number;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    rating: number;

    @IsNotEmpty()
    @ApiProperty({
        name: "status",
        nullable: true,
        type: "boolean",
    })
    status: boolean;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    image: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    video: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    mediaId: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    description: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    content: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    stockQuantity: number;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    priority: number;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    tags: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoTitle: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoDescription: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoKeyword: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    seoLocation: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "number",
    })
    userId: number;

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    categoryIds: number[];

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    colorIds: number[];

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            type: "number",
        },
    })
    sizeIds: number[];

    @ApiProperty({
        nullable: true,
        type: "array",
        items: {
            $ref: getSchemaPath(ProductGalleryDto),
        },
    })
    galleries: ProductGalleryDto[];
}
