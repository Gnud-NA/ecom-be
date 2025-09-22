import { Injectable } from "@nestjs/common";
import Role from "@src/app/role/entities/role.entity";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class RoleRepository extends BaseRepositorySequelize<Role> {
    constructor(public sequelize: Sequelize) {
        super(sequelize, "Role");
    }
}
