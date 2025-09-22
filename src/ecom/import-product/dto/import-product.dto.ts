import { ApiProperty } from "@nestjs/swagger";

export class ImportProductDto {
    @ApiProperty({
        description: "CSV file",
        type: "string",
        format: "binary",
    })
    file: any;

    @ApiProperty({
        description: "Brand Name",
        type: "string",
    })
    brandName: string;
}
