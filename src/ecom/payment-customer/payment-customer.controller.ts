import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaymentCustomerService } from "./payment-customer.service";

@ApiTags("PaymentCustomer")
@ApiBearerAuth()
@Controller("payment-customers")
export class PaymentCustomerController {
    constructor(private readonly paymentCustomerService: PaymentCustomerService) {}

    // @UseGuards(AdminGuard)
    // @Post()
    // create(@Body() createPaymentCustomerDto: CreatePaymentCustomerDto) {
    //     return this.paymentCustomerService.create(createPaymentCustomerDto);
    // }

    // @ApiOkResponse({
    //     description: "The PaymentCustomer records",
    //     schema: {
    //         type: "object",
    //         properties: {
    //             count: {
    //                 type: "number",
    //             },
    //             data: {
    //                 type: "array",
    //                 items: {
    //                     $ref: getSchemaPath(PaymentCustomerEntity),
    //                 },
    //             },
    //         },
    //     },
    // })
    // @Get()
    // findAll(@Query() filter?: FilterPaymentCustomerDto): Promise<BaseResponse<PaymentCustomerEntity[]>> {
    //     return this.paymentCustomerService.findAll(filter);
    // }

    // @ApiOkResponse({
    //     description: "The PaymentCustomer records",
    //     schema: {
    //         $ref: getSchemaPath(PaymentCustomerEntity),
    //     },
    // })
    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return this.paymentCustomerService.findOne(+id);
    // }

    // @UseGuards(AdminGuard)
    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updatePaymentCustomerDto: UpdatePaymentCustomerDto) {
    //     return this.paymentCustomerService.update(+id, updatePaymentCustomerDto);
    // }

    // @UseGuards(AdminGuard)
    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.paymentCustomerService.remove(+id);
    // }

    // @UseGuards(AdminGuard)
    // @Delete(":id/force-delete")
    // destroy(@Param("id") id: string) {
    //     return this.paymentCustomerService.destroy(+id);
    // }
}
