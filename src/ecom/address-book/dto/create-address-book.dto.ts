import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressBookDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Address line 1",
        example: "123",
    })
    addressLine1: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Address line 2",
        example: "123",
    })
    addressLine2: string;

    @ApiProperty({
        description: "Street",
        example: "123 Main St",
    })
    street: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "City",
        example: "New York",
    })
    city: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Country",
        example: "United States",
    })
    country: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "State",
        example: "NY",
    })
    state: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Zipcode",
        example: "10001",
    })
    zipcode: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Door code",
        example: "1234",
    })
    doorCode: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        description: "Is default",
        example: false,
    })
    isDefault: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        description: "Is billing",
        example: false,
    })
    isBilling: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        description: "Is delivery",
        example: false,
    })
    isDelivery: boolean;
}
