import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateMenuDto {
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
        name: "description",
        type: "string",
    })
    description: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "wfCode",
        type: "string",
    })
    wfCode: string;

    @IsNotEmpty()
    @ApiProperty({
        name: "isPrimary",
        type: "boolean",
        default: false,
    })
    isPrimary: boolean;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "userId",
        type: "number",
    })
    userId: number;
}
