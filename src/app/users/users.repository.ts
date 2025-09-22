import { Injectable } from "@nestjs/common";
import User from "@src/app/users/entities/user.entity";
import { BaseRepositorySequelize } from "@src/base";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class UserRepository extends BaseRepositorySequelize<User> {
  constructor(public sequelize: Sequelize) {
    super(sequelize, "User");
  }
}
