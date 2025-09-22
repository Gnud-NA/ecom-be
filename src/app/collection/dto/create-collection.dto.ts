import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCollectionDto {
    @MaxLength(256)
    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        name: "name",
        type: "string",
    })
    name: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    parentId?: number;

    // @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "number",
    })
    userId: number;
}
