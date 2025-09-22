import { Request } from "express";
import { DeleteResult } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";

export interface IBaseService<T> {
    index(): Promise<T[]>;

    findById(id: EntityId): Promise<T>;

    findByIds(id: [EntityId]): Promise<T[]>;

    create(data: any): Promise<T>;

    updateById(id: EntityId | number, data: any): Promise<T>;

    delete(id: EntityId | number): Promise<BaseDeletedResponse | DeleteResult>;
}

export interface BaseFilter {
    where?: any;
    limit?: number;
    offset?: number;
    order?: string | string[];
}

export interface BaseResponse<T = any> {
    count?: number;
    data?: T;
}

export interface BaseCreatedResponse<T = any> {
    status?: boolean;
    data?: T;
}

export interface BaseUpdatedResponse<T = any> {
    status?: boolean;
    data?: T;
}

export interface BaseDeletedResponse {
    status?: boolean;
}

export interface RequestWithAuth extends Request {
    auth?: {
        userId: number;
        email: string;
        paymentCustomerId: string;
    };
}

export interface AnyObject {
    [key: string]: any;
}
