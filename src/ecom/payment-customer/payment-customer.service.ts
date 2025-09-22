import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CreatePaymentCustomerDto } from "@src/ecom/payment-customer/dto/create-payment-customer.dto";
import { FilterPaymentCustomerDto } from "@src/ecom/payment-customer/dto/payment-customer.dto";
import { UpdatePaymentCustomerDto } from "@src/ecom/payment-customer/dto/update-payment-customer.dto";
import PaymentCustomer from "@src/ecom/payment-customer/entities/payment-customer.entity";
import { PaymentCustomerRepository } from "@src/ecom/payment-customer/payment-customer.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class PaymentCustomerService extends BaseService<PaymentCustomer, PaymentCustomerRepository> {
    constructor(
        @Inject(PaymentCustomerRepository)
        private readonly paymentCustomerRepository: PaymentCustomerRepository,
        private sequelize: Sequelize
    ) {
        super(paymentCustomerRepository);
    }

    async create(createPaymentCustomerDto: CreatePaymentCustomerDto) {
        const paymentCustomer = await this.paymentCustomerRepository.create(createPaymentCustomerDto);
        return await this.findOne(paymentCustomer.id);
    }

    async findAll(filter?: FilterPaymentCustomerDto): Promise<BaseResponse<PaymentCustomer[]>> {
        const paymentCustomers = await this.paymentCustomerRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.paymentCustomerRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: paymentCustomers,
        };
    }

    async update(id: number, updatePaymentCustomerDto: UpdatePaymentCustomerDto) {
        await this.paymentCustomerRepository.updateByIdWithBase(id, updatePaymentCustomerDto);

        const paymentCustomer = await this.paymentCustomerRepository.findById(id);

        return this.findOne(paymentCustomer.id);
    }
}
