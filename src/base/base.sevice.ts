import { BaseModelSequelize } from "@src/base/base.model";
import { BaseRepositorySequelize } from "@src/base/base.repository";
import { BaseEntity, DeleteResult, IsNull, Repository } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";
import { BaseDeletedResponse, IBaseService } from "./base.interface";

export class BaseServiceORM<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
    protected readonly repository: R;
    //   protected readonly logger: LoggerService

    constructor(
        repository: R
        // logger: LoggerService
    ) {
        this.repository = repository;
        // this.logger = logger
    }

    index(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: EntityId): Promise<T> {
        return this.repository.findOneBy({ id } as any);
    }

    async findOne(id: EntityId): Promise<T> {
        return this.repository.findOne({ id } as any);
    }

    async findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.findBy({ id: ids } as any);
    }

    async create(data: any): Promise<T> {
        return this.repository.save(data);
    }

    async updateById(id: EntityId, data: any): Promise<T> {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    async delete(id: EntityId): Promise<DeleteResult> {
        return this.repository.update(id, { deletedAt: IsNull() } as any);
    }

    async destroy(id: EntityId): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}

export class BaseService<T extends BaseModelSequelize<T>, R extends BaseRepositorySequelize<T>>
    implements IBaseService<T>
{
    protected readonly repository: R;

    constructor(repository: R) {
        this.repository = repository;
    }

    async index(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: EntityId): Promise<T> {
        return this.repository.findById(+id);
    }

    async findOne(id: EntityId): Promise<T> {
        return this.repository.findOne({ where: { id } } as any);
    }

    async findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.find({ id: ids } as any);
    }

    async create(data: any): Promise<T> {
        return this.repository.create(data);
    }

    async updateById(id: number, data: any): Promise<T> {
        await this.repository.updateById(id, data);
        return this.findById(id);
    }

    async delete(id: number): Promise<BaseDeletedResponse> {
        return this.repository.delete(id);
    }

    async remove(id: number): Promise<BaseDeletedResponse> {
        return this.delete(id);
    }

    async destroy(id: number): Promise<BaseDeletedResponse> {
        return this.repository.forceDelete(id);
    }
}
