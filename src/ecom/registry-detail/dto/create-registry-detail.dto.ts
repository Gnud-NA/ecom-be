import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateRegistryDetailDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: "number",
        name: "registryId",
        example: 1,
    })
    registryId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: "number",
        name: "productId",
        example: 1,
    })
    productId: number;

    @IsOptional()
    @IsNumber()
    @Min(1, { message: "colorId not invalid" })
    @ApiPropertyOptional({
        type: "number",
        name: "colorId",
        example: 1,
    })
    colorId: number;

    @IsOptional()
    @IsNumber()
    @Min(1, { message: "sizeId not invalid" })
    @ApiPropertyOptional({
        type: "number",
        name: "sizeId",
        example: 1,
    })
    sizeId: number;
}
