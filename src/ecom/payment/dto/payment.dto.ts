// export class FilterProductDto extends PaginationQuery {
//     @ApiProperty({
//         nullable: true,
//         name: "query",
//         type: "object",
//         properties: {
//             where: {
//                 type: "object",
//                 properties: {
//                     id: {
//                         type: "number",
//                     },
//                 },
//             },
//         },
//     })
//     where?: {
//         id?: number;
//     };

import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CurrencyEnum } from "@src/config";
import { IsNotEmpty } from "class-validator";

//     // @ApiProperty({
//     //     enum: ProductTypeEnum,
//     //     required: true,
//     // })
//     // postType?: ProductTypeEnum;

//     @ApiProperty({
//         type: "string",
//         required: false,
//     })
//     search?: string;

//     @ApiProperty({
//         type: "number",
//         required: false,
//     })
//     categoryId?: number;
// }

export class StripeCreateIntentDto {
    @ApiProperty({
        type: "number",
        required: true,
    })
    amount: number;

    @ApiProperty({
        type: "string",
        required: true,
    })
    customerId: string;

    @ApiProperty({
        type: "string",
        required: true,
    })
    orderId: string;

    @ApiProperty({
        type: "string",
        required: false,
    })
    orderCode: string;

    @ApiProperty({
        type: "enum",
        enum: Object.values(CurrencyEnum),
        required: true,
        default: CurrencyEnum.USD,
    })
    currency: CurrencyEnum;

    @ApiProperty({
        type: "boolean",
        required: false,
        default: false,
    })
    offSession?: boolean;

    @ApiProperty({
        type: "boolean",
        required: false,
        default: false,
    })
    confirm?: boolean;

    @ApiProperty({
        type: "string",
        required: false,
    })
    paymentMethodId: string;
}

export class StripeCreateCustomerDto {
    @ApiProperty({
        type: "string",
        required: true,
    })
    paymentMethodId: string;
}

export class USPSGetRateDto {
    @ApiProperty({
        type: "string",
        required: true,
    })
    originZip: string;

    @ApiProperty({
        type: "string",
        required: true,
    })
    destinationZip: string;

    @ApiProperty({
        type: "string",
        required: true,
    })
    weight: number;
}

export class StripeSetupIntentNewCustomerResponseDto {
    @ApiProperty({
        type: "string",
        required: true,
    })
    clientSecret: string;
}

export class StripePaymentWithSavedCardDto extends OmitType(StripeCreateIntentDto, ["paymentMethodId", "customerId"]) {
    @ApiProperty({
        type: "number",
        required: true,
        nullable: false,
    })
    @IsNotEmpty()
    userBankCardId: number;
}
