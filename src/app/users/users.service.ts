import { Injectable } from "@nestjs/common";
import Role from "@src/app/role/entities/role.entity";
import { BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { RoleEnum } from "@src/config";
import { convertFilterWithOrderBy, convertFilterWithWhere } from "@src/utils";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./users.repository";
@Injectable()
export class UsersService {
    constructor(private userRepo: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepo.create(createUserDto);
        return user;
    }

    async findAllAdmin(filter?: PaginationQuery): Promise<BaseResponse> {
        const users = await this.userRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
            include: [{ model: Role, required: true, where: { id: RoleEnum.ADMIN } }],
        });
        const count = await this.userRepo.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
            include: [{ model: Role, required: true, where: { id: RoleEnum.ADMIN } }],
        });

        // const [count, users] = await Promise.all([
        //   this.userRepo.count(filter),
        //   this.userRepo.find(filter),
        // ]);
        return { count, data: users };
    }
    async findAllCustomer(filter?: PaginationQuery): Promise<BaseResponse> {
        const users = await this.userRepo.find({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
            include: [{ model: Role, required: true, where: { id: RoleEnum.USER } }],
        });
        const count = await this.userRepo.count({
            ...convertFilterWithOrderBy(filter),
            where: {
                ...convertFilterWithWhere(filter),
            },
            include: [{ model: Role, required: true, where: { id: RoleEnum.USER } }],
        });

        return { count, data: users };
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepo.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<BaseUpdatedResponse<User>> {
        const res = await this.userRepo.updateById(id, updateUserDto);
        const user = await this.userRepo.findById(id);
        return { ...res, data: user };
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        const user = await this.userRepo.delete(id);
        return { status: true };
    }
}
