import { ApiProperty } from "@nestjs/swagger";
import { MediaAbleTypeEnum, MediaMimeTypeEnum, MediaSeviceTypeEnum, MediaTypeEnum } from "@src/config";
import { Type } from "class-transformer";

export class UploadImageDto {
    @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
    @Type(() => Buffer)
    images?: Buffer[];

    @ApiProperty({
        type: "string",
        name: "slug",
    })
    slug?: string;

    @ApiProperty({
        type: "string",
        name: "mediaType",
        enum: MediaTypeEnum,
        default: MediaTypeEnum.IMAGE,
    })
    mediaType: MediaTypeEnum;

    @ApiProperty({
        type: "string",
        name: "mediaAbleType",
        enum: MediaAbleTypeEnum,
        default: MediaAbleTypeEnum.POST,
        nullable: true,
    })
    mediaAbleType: MediaAbleTypeEnum;

    @ApiProperty({
        type: "string",
        name: "type",
        enum: MediaSeviceTypeEnum,
        default: MediaSeviceTypeEnum.POST,
    })
    type: MediaSeviceTypeEnum;

    @ApiProperty({
        type: "number",
        name: "targetId",
    })
    targetId?: number;

    @ApiProperty({
        type: "number",
        name: "collectionId",
    })
    collectionId?: number;
}

import { PaginationQuery } from "./../../../base/dto/filter.dto";

export class MediaFilter extends PaginationQuery {
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
        enum: MediaSeviceTypeEnum,
        required: true,
    })
    type?: MediaSeviceTypeEnum;

    @ApiProperty({
        type: "number",
        required: false,
    })
    collectionId?: number;
}

export class PreSignedUrlDto {
    @ApiProperty({
        type: "string",
        name: "slug",
    })
    slug?: string;

    @ApiProperty({
        type: "string",
        name: "mimeType",
        enum: MediaMimeTypeEnum,
        default: MediaMimeTypeEnum.JPG,
    })
    mimeType: MediaMimeTypeEnum;

    @ApiProperty({
        type: "string",
        name: "mediaType",
        enum: MediaTypeEnum,
        default: MediaTypeEnum.IMAGE,
    })
    mediaType: MediaTypeEnum;

    @ApiProperty({
        type: "string",
        name: "mediaAbleType",
        enum: MediaAbleTypeEnum,
        default: MediaAbleTypeEnum.POST,
        nullable: true,
    })
    mediaAbleType: MediaAbleTypeEnum;

    @ApiProperty({
        type: "string",
        name: "type",
        enum: MediaSeviceTypeEnum,
        default: MediaSeviceTypeEnum.POST,
    })
    type: MediaSeviceTypeEnum;

    @ApiProperty({
        type: "number",
        name: "targetId",
    })
    targetId?: number;

    @ApiProperty({
        type: "number",
        name: "collectionId",
    })
    collectionId?: number;
}
