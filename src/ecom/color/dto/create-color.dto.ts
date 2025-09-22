import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateColorDto {
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
    hexCode: string;
}
