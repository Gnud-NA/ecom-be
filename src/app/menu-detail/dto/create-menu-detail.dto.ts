import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateMenuDetailDto {
    @IsNotEmpty()
    @ApiProperty({
        name: "menuId",
        type: "number",
    })
    menuId: number;

    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "name",
        type: "string",
    })
    name: string;

    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "url",
        type: "string",
    })
    url: string;

    @ApiProperty({
        nullable: false,
        name: "description",
        type: "string",
    })
    description: string;

    @ApiProperty({
        nullable: false,
        name: "icon",
        type: "string",
    })
    icon: string;

    @ApiProperty({
        nullable: false,
        name: "image",
        type: "string",
    })
    image: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    parentId?: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
    })
    userId: number;
}
