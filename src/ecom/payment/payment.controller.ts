import { Body, Controller, HttpCode, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "@src/app/auth/user.guard";
import { RequestWithAuth } from "@src/base";
import {
    StripeCreateCustomerDto,
    StripeCreateIntentDto,
    StripePaymentWithSavedCardDto,
    StripeSetupIntentNewCustomerResponseDto,
} from "@src/ecom/payment/dto/payment.dto";
import { ContextInterceptor } from "@src/validates/request.interceptor";
import { USPSGetRateDto } from "./dto/payment.dto";
import { ShippingService } from "./shipping.service";
import { StripeService } from "./stripe.service";

@ApiTags("Payments")
@ApiBearerAuth()
@Controller("ecom/payments")
@UseInterceptors(ContextInterceptor)
export class PaymentsController {
    constructor(private readonly stripeService: StripeService, private readonly shippingService: ShippingService) {}

    // @UseGuards(UserGuard)
    @Post("stripe/create-customer")
    async createCustomerObject(@Body() stripeCreateCustomerDto: StripeCreateCustomerDto, @Req() request) {
        return this.stripeService.createCustomer(request, stripeCreateCustomerDto);
    }

    @UseGuards(UserGuard)
    @Post("stripe/setup-intent-new-customer")
    @ApiOperation({ summary: "Setup Intent New Customer" })
    @ApiOkResponse({
        description: "Setup Intent New Customer",
        type: String,
        example: {
            clientSecret: "123456789",
        },
    })
    async setupIntentNewCustomer(@Req() request: RequestWithAuth): Promise<StripeSetupIntentNewCustomerResponseDto> {
        return this.stripeService.setupIntentNewCustomer(request);
    }

    // @UseGuards(UserGuard)
    @Post("stripe/create-payment-intent")
    async createPaymentIntent(@Body() stripeCreateIntentDto: StripeCreateIntentDto) {
        return this.stripeService.createPaymentIntent(stripeCreateIntentDto);
    }

    @UseGuards(UserGuard)
    @Post("stripe/payment-with-saved-card")
    async paymentWithSavedCard(
        @Body() stripePaymentWithSavedCardDto: StripePaymentWithSavedCardDto,
        @Req() request: RequestWithAuth
    ) {
        return await this.stripeService.paymentWithSavedCard(stripePaymentWithSavedCardDto, request);
    }

    @HttpCode(200) // Stripe yêu cầu HTTP 200 khi webhook xử lý thành công
    @ApiOperation({ summary: "Stripe Payment Intent Callback" })
    // @ApiBody({
    //     schema: {
    //         type: "object",
    //         additionalProperties: true, // Để hỗ trợ các key-value tùy ý từ Stripe
    //         example: {
    //             id: "evt_123456789",
    //             object: "event",
    //             type: "payment_intent.succeeded",
    //             data: {
    //                 object: {
    //                     id: "pi_123456789",
    //                     amount: 1000,
    //                     currency: "usd",
    //                     status: "succeeded",
    //                 },
    //             },
    //         },
    //     },
    // })
    @Post("stripe/stripe-payment-callback")
    async callbackPaymentIntent(@Req() request: RequestWithAuth) {
        await this.stripeService.callbackPaymentIntent(request);
        return { received: true };
    }

    @Post("shipping/usps/get-rate")
    async getShippingRate(@Body() uspsGetRateDto: USPSGetRateDto, @Req() request: RequestWithAuth) {
        return this.shippingService.getShippingRate(uspsGetRateDto);
    }
}
