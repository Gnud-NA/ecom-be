import { PartialType } from "@nestjs/swagger";
import { CreatePaymentCustomerDto } from "./create-payment-customer.dto";

export class UpdatePaymentCustomerDto extends PartialType(CreatePaymentCustomerDto) {}
