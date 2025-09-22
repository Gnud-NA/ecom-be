import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Wallet from "@src/ecom/wallet/entities/wallet.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class WalletRepository extends BaseRepositorySequelize<Wallet> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Wallet");
    }
}
