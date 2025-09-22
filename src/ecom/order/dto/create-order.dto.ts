import { ApiProperty } from "@nestjs/swagger";
import {
    OrderPaymentMethodEnum,
    OrderPaymentStatusEnum,
    OrderShippingStatusEnum,
    OrderStatusEnum,
    ShippingMethodEnum,
} from "@src/config";
import { CreateOrderDetailDto } from "@src/ecom/order-detail/dto/create-order-detail.dto";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        nullable: true,
        type: "number",
    })
    userId?: number;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    code?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    address?: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    promotionCode?: string;

    @ApiProperty({
        nullable: true,
        type: "number",
    })
    promotionAmount?: number;

    @ApiProperty({
        nullable: true,
        type: "boolean",
    })
    status?: boolean;

    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(OrderStatusEnum),
        default: OrderStatusEnum?.ACTIVATION,
    })
    orderStatus?: OrderStatusEnum;

    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(OrderPaymentStatusEnum),
        default: OrderPaymentStatusEnum?.PENDING,
    })
    paymentStatus?: OrderPaymentStatusEnum;

    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(OrderPaymentMethodEnum),
        default: OrderPaymentMethodEnum?.CREDIT_CARD,
    })
    paymentMethod?: OrderPaymentMethodEnum;

    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(OrderShippingStatusEnum),
        default: OrderShippingStatusEnum?.NONE,
    })
    shippingStatus?: OrderShippingStatusEnum;

    @ApiProperty({
        nullable: true,
        type: "enum",
        enum: Object.keys(ShippingMethodEnum),
        default: ShippingMethodEnum?.STANDARD,
    })
    shippingMethod?: ShippingMethodEnum;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    description: string;

    @ApiProperty({
        nullable: true,
        type: "string",
    })
    note: string;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    totalQuantity: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    totalAmount: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    taxAmount: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    taxes: number;

    @ApiProperty({
        nullable: false,
        type: "number",
    })
    shippingAmount: number;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    firstName: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    lastName: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    email: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    phone: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    apartment: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    securityCode: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    city: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    state: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    country: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    postCode: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToAddress: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToFirstName: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToLastName: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToEmail: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToPhone: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToApartment: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToSecurityCode: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToCity: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToState: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToCountry: string;

    @ApiProperty({
        nullable: true,
        type: String,
    })
    shippingToPostCode: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    @ArrayNotEmpty()
    @ApiProperty({
        nullable: false,
        type: [CreateOrderDetailDto],
        isArray: true,
    })
    orderDetails: CreateOrderDetailDto[];
}
