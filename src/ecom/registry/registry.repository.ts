import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import Registry from "./entities/registry.entity";

@Injectable()
export class RegistryRepository extends BaseRepositorySequelize<Registry> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Registry");
    }
}
