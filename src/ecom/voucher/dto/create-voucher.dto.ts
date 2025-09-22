import { ApiProperty } from "@nestjs/swagger";
import { VoucherTypeEnum } from "@src/config";
import { IsNotEmpty } from "class-validator";

export class CreateVoucherDto {
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
    code: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
        type: "number",
        default: 0,
    })
    amount: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(VoucherTypeEnum),
        default: VoucherTypeEnum.CASH,
    })
    type: VoucherTypeEnum;

    @IsNotEmpty()
    @ApiProperty({
        nullable: true,
        type: "boolean",
        default: true,
    })
    status: boolean;
}
