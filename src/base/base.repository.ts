import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BaseDeletedResponse, BaseResponse, BaseUpdatedResponse } from "@src/base/base.interface";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { BASE_FILTER } from "@src/config";
import { convertOrderObjectFilter } from "@src/utils";
import { omit } from "lodash";
import { AnyObject, HydratedDocument, Model } from "mongoose";
import { isNilOrEmpty } from "ramda-adjunct";
import { FindOptions, Transaction } from "sequelize";
import { ModelCtor, Sequelize } from "sequelize-typescript";
import { DeepPartial, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AbstractModel, BaseModelSequelize } from "./base.model";
import moment = require("moment");

@Injectable()
export class BaseRepository<T, K extends AbstractModel> extends Repository<T> {
    async getAll(relations: string[] = [], throwsException = false): Promise<K[] | null> {
        return await this.find({ relations }).then((entity) => {
            if (!entity && throwsException) {
                return Promise.reject(new NotFoundException("Model not found"));
            }
        });
    }

    async getById(id: string | number, relations: string[] = [], throwsException = false): Promise<K | null> {
        return await this.findOne({
            where: {},
            relations,
        }).then((entity) => {
            if (!entity && throwsException) {
                return Promise.reject(new NotFoundException("Model not found"));
            }
        });
    }

    async createEntity(inputs: DeepPartial<T>, relations: string[] = []): Promise<K> {
        return await this.save(inputs)
            .then(async (entity) => {
                return await this.getById((entity as any).id, relations);
            })
            .catch((error) => Promise.reject(error));
    }

    async updateEntity(entity: K, inputs: QueryDeepPartialEntity<T>, relations: string[] = []): Promise<K> {
        return await this.update(entity.id, inputs)
            .then(async (entity) => {
                return await this.getById((entity as any).id, relations);
            })
            .catch((error) => Promise.reject(error));
    }

    async deleteEntityById(id: number | string): Promise<boolean> {
        return await this.delete(id)
            .then(() => {
                return true;
            })
            .catch((error) => Promise.reject(error));
    }
}

@Injectable()
export class BaseRepositorySequelize<T extends BaseModelSequelize<T>> {
    public model: ModelCtor<T>;
    public sequelize: Sequelize;

    constructor(@Inject(Sequelize) private readonly sequelizes: Sequelize, private readonly modelName: string) {
        this.sequelize = sequelizes;
        this.model = sequelizes.model(this.modelName) as ModelCtor<T>;
    }

    public async count(filter?: FindOptions & PaginationQuery): Promise<number> {
        const res = await this.model.count({
            ...filter,
            where: { deletedAt: null, ...filter?.where },
        });
        return res;
    }

    public async findAndCount(filter?: FindOptions & PaginationQuery): Promise<BaseResponse<T[]>> {
        const { rows, count } = await this.model.findAndCountAll({
            ...filter,
            where: { deletedAt: null, ...filter?.where },
            distinct: true,
        });
        return {
            count: count,
            data: rows,
        };
    }

    public async find(filter?: FindOptions | PaginationQuery): Promise<T[]> {
        const res = await this.model.findAll({
            ...filter,
            where: { deletedAt: null, ...filter?.where },
        });
        return res;
    }

    public async findOne(filter?: FindOptions | PaginationQuery, transaction?: Transaction): Promise<T | null> {
        const res = await this.model.findOne({
            ...filter,
            where: { deletedAt: null, ...filter?.where },
            transaction,
        });
        return isNilOrEmpty(res?.dataValues) ? null : res?.dataValues;
    }

    async findById(id: number, filter?: FindOptions | PaginationQuery): Promise<T> {
        return this.model.findByPk(id, { ...filter });
    }

    async create(request: any, transaction?: Transaction): Promise<T> {
        return this.model.create(request, { transaction });
    }

    async update(request: any, filter?: FindOptions | PaginationQuery, transaction?: Transaction): Promise<[number]> {
        return this.model.update(request, { where: { id: request?.id, ...filter?.where }, transaction });
    }

    async updateWhere(request: any, filter?: FindOptions | PaginationQuery): Promise<[number]> {
        return this.model.update(request, { where: { ...filter?.where } });
    }

    async updateById(id: number, request: any): Promise<BaseUpdatedResponse<T>> {
        await this.model.update(request, {
            where: { id: id as any },
        });
        return { status: true };
    }

    async updateByIdWithBase(id: number, request: any, transaction?: Transaction): Promise<any> {
        return await this.model.update(request, {
            where: { id: id as any },
            transaction,
        });
    }

    async delete(id: number, transaction?: Transaction): Promise<BaseDeletedResponse> {
        const result = await this.model.update<any>(
            { deletedAt: moment().toISOString() },
            { where: { id: id as any }, transaction }
        );
        return { status: true };
    }

    async sum(column: keyof T, filter?: FindOptions | PaginationQuery, transaction?: Transaction): Promise<number> {
        const res = await this.model.sum(column, {
            where: { deletedAt: null, ...filter?.where },
            transaction,
        });
        return res;
    }

    async deleteWidthCondition({
        transaction,
        deleteWidthCondition,
    }: {
        transaction?: Transaction;
        deleteWidthCondition?: AnyObject;
    }): Promise<BaseDeletedResponse> {
        const result = await this.model.update<any>(
            { deletedAt: moment().toISOString() },
            { where: { ...deleteWidthCondition }, transaction }
        );
        return { status: true };
    }

    async forceDelete(id: number, transaction?: Transaction): Promise<BaseDeletedResponse> {
        const result = await this.model.destroy<any>({ where: { id }, transaction });
        return { status: true };
    }
}

@Injectable()
export class BaseRepositoryMongoDB<T extends any> {
    public model: Model<T>;
    constructor(private readonly dModel: any) {
        this.model = dModel;
    }

    async create(entity: Partial<T>): Promise<T> {
        const record = new this.model(entity);
        return record.save() as any;
    }

    async getAll(filter: any): Promise<HydratedDocument<T>[]> {
        const res = await this.model
            .find(omit(filter, "limit"))
            .limit(filter?.limit ?? BASE_FILTER.LIMIT_DEFAULT)
            .skip(filter?.offset ?? BASE_FILTER.OFFSET_DEFAULT)
            .sort(convertOrderObjectFilter(filter) ?? { createdAt: "desc" })
            .exec();
        return res;
    }

    async count(filter: any): Promise<Number> {
        const res = await this.model.count();
        return res;
    }
}
