import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateSlideDetailDto {
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "title",
        type: "string",
    })
    title: string;

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
    slideId?: number;

    @IsNotEmpty()
    @ApiProperty({
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
        nullable: false,
        type: "string",
    })
    background: string;

    @ApiProperty({
        nullable: false,
        type: "string",
    })
    menuWfCode: string;
}
