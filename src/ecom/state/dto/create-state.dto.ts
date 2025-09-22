import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateStateDto {
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
