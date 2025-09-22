import { Injectable } from "@nestjs/common";
import { Auth } from "@src/app/auth/entities/auth.entity";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class AuthRepository extends BaseRepositorySequelize<Auth> {
  constructor(public sequelize: Sequelize) {
    super(sequelize, "Auth");
  }
}
