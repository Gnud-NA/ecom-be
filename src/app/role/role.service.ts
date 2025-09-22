import { Inject, Injectable } from "@nestjs/common";
import { Role } from "@src/app/role/entities/role.entity";
import { RoleRepository } from "@src/app/role/role.repository";
import { BaseService } from "@src/base";

@Injectable()
export class RoleService extends BaseService<Role, RoleRepository> {
    constructor(
        @Inject(RoleRepository)
        private readonly roleRepo: RoleRepository
    ) {
        super(roleRepo);
    }
}
