import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import Country from "@src/ecom/country/entities/country.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class CountryRepository extends BaseRepositorySequelize<Country> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Country");
    }
}
