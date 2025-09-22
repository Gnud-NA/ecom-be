import { Inject, Injectable } from "@nestjs/common";
import { BaseResponse, BaseService } from "@src/base";
import { CreateVoucherDto } from "@src/ecom/voucher/dto/create-voucher.dto";
import { UpdateVoucherDto } from "@src/ecom/voucher/dto/update-voucher.dto";
import { FilterVoucherDto } from "@src/ecom/voucher/dto/voucher.dto";
import Voucher from "@src/ecom/voucher/entities/voucher.entity";
import { VoucherRepository } from "@src/ecom/voucher/voucher.repository";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class VoucherService extends BaseService<Voucher, VoucherRepository> {
    constructor(
        @Inject(VoucherRepository)
        private readonly voucherRepository: VoucherRepository,
        private sequelize: Sequelize
    ) {
        super(voucherRepository);
    }

    async create(createVoucherDto: CreateVoucherDto) {
        const voucher = await this.voucherRepository.create(createVoucherDto);
        return await this.findOne(voucher.id);
    }

    async findAll(filter?: FilterVoucherDto): Promise<BaseResponse<Voucher[]>> {
        const vouchers = await this.voucherRepository.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        const count = await this.voucherRepository.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
        });
        return {
            count,
            data: vouchers,
        };
    }

    async update(id: number, updateVoucherDto: UpdateVoucherDto) {
        await this.voucherRepository.updateByIdWithBase(id, updateVoucherDto);

        const voucher = await this.voucherRepository.findById(id);

        return this.findOne(voucher.id);
    }
}
