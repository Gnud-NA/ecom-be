import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import RegistryDetail from "./entities/registry-detail.entity";

@Injectable()
export class RegistryDetailRepository extends BaseRepositorySequelize<RegistryDetail> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "RegistryDetail");
    }
}
