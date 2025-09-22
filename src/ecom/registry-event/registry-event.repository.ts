import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";
import { RegistryEvent } from "./entities/registry-event.entity";

@Injectable()
export class RegistryEventRepository extends BaseRepositorySequelize<RegistryEvent> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "RegistryEvent");
    }
}
