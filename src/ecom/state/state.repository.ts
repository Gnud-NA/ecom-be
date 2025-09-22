import { Injectable } from "@nestjs/common";
import { BaseRepositorySequelize } from "@src/base";
import State from "@src/ecom/state/entities/state.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class StateRepository extends BaseRepositorySequelize<State> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "State");
    }
}
