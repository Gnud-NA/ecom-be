import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateSlideDto {
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "string",
    })
    name: string;

    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    description: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "boolean",
        default: true,
    })
    status: boolean;

    @MaxLength(256)
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    wfCode: string;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    userId: number;
}
