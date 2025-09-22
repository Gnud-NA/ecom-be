import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRegistryDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: "number",
        name: "registryEventId",
        example: 1,
    })
    registryEventId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: "string",
        name: "firstName",
        example: "John",
    })
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: "string",
        name: "lastName",
        example: "Doe",
    })
    lastName: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        nullable: true,
        type: "date",
        example: "2025-05-11T11:17:18.557Z",
    })
    eventDate: Date;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Description",
        example: "Description",
    })
    description: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Recipient first name",
        example: "Recipient first name",
    })
    recipientFirstName: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Recipient last name",
        example: "Recipient last name",
    })
    recipientLastName: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Phone",
        example: "1234567890",
    })
    phone: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Country calling code",
    })
    countryCallingCode: string;

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

    @IsNotEmpty()
    @IsString()
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
        description: "Is private",
        example: false,
    })
    isPrivate: boolean;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Pin code",
        example: "1234",
    })
    pinCode: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Question name",
        example: "Question name",
    })
    questionName: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: "Question message",
        example: "Question message",
    })
    questionMessage: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        description: "Is receive egift card",
        example: false,
    })
    isReceiveEgiftCard: boolean;
}
