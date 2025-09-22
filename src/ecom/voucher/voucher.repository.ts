import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Voucher from "@src/ecom/voucher/entities/voucher.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class VoucherRepository extends BaseRepositorySequelize<Voucher> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Voucher");
    }
}
