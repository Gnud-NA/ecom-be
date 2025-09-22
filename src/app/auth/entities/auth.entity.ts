import User from "@src/app/users/entities/user.entity";
import { Table } from "sequelize-typescript";

@Table({ tableName: "wf_users" })
export class Auth extends User {}
