import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { OrderPaymentService } from "@src/ecom/order-payment/order-payment.service";

@ApiTags("OrderPayment")
@ApiBearerAuth()
@Controller("ecom/order-payments")
export class OrderPaymentController {
    constructor(private readonly orderPaymentService: OrderPaymentService) {}
}
