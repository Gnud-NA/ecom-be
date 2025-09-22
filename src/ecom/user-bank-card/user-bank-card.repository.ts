import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import UserBankCard from "./entities/user-bank-card.entity";

@Injectable()
export class UserBankCardRepository extends BaseRepositorySequelize<UserBankCard> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "UserBankCard");
    }
}
