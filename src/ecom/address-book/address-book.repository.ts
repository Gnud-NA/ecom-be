import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import AddressBook from "./entities/address-book.entity";

@Injectable()
export class AddressBookRepository extends BaseRepositorySequelize<AddressBook> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "AddressBook");
    }
}
