import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSizeDto {
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "string",
    })
    description: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    length: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    chest: string;
}
