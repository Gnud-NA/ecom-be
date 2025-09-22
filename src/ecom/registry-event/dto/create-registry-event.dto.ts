import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRegistryEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Events Name",
        example: "events name",
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Events Description",
        example: "events description",
    })
    description: string;
}
