import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import WalletTransaction from "./entities/wallet-transaction.entity";

@Injectable()
export class WalletTransactionRepository extends BaseRepositorySequelize<WalletTransaction> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "WalletTransaction");
    }
}
