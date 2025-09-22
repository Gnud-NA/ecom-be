import { HttpException, HttpStatus } from "@nestjs/common";
import { PaginationQuery } from "@src/base/dto/filter.dto";
import { OrderByEnum } from "@src/config";
import { omit } from "lodash";
import { AnyObject } from "mongoose";
import { isNotArray } from "ramda-adjunct";
import { Order } from "sequelize";
import slugify from "slugify";
import { BaseFilter } from "../base/base.interface";

export const convertFilter = (filter: BaseFilter): BaseFilter & { take: number; skip: number } => {
    return {
        ...omit(filter, ["limit", "offset"]),
        skip: filter.offset ?? 0,
        take: filter.limit ?? 10,
    };
};

export const convertOrderObjectFilter = (filter: BaseFilter & { order: string }): AnyObject => {
    try {
        let order = JSON.parse(filter?.order);
        return order;
    } catch (e) {
        return { createdAt: "desc" };
    }
};

export const HandleError = (message: string, code?: any, statusCode?: number, error?: any) => {
    throw new HttpException(
        {
            code: code ?? HttpStatus.UNAUTHORIZED,
            statusCode: statusCode ?? 401,
            error: message,
        },
        statusCode ?? HttpStatus.UNAUTHORIZED,
        {
            cause: error,
        }
    );
};

export const insertIfObject = (condition: any, object: AnyObject, defaultValue?: AnyObject) => {
    return !!condition ? object : defaultValue ?? {};
};

export const convertToOrderFilter = (orderBy: { column: string; order: OrderByEnum }[]): Order => {
    let res = [];
    let orderBy_;
    if (isNotArray(orderBy)) {
        orderBy_ = [orderBy];
    } else {
        if (isNotArray(orderBy?.[0])) {
            orderBy_ = orderBy;
        } else {
            return orderBy as unknown as Order;
        }
    }
    orderBy_?.map((item) => {
        let item_;
        if (typeof item === "string") {
            item_ = JSON.parse(item);
        } else {
            item_ = item;
        }
        res.push([item_?.column, item_?.order]);
    });
    return res;
};
export const convertFilterWithOrderBy = (filter: PaginationQuery) => {
    // console.log(filter, "filter");
    return {
        ...filter,
        ...insertIfObject(!!filter?.orderBy, omit({ order: convertToOrderFilter(filter?.orderBy) }, ["orderBy"])),
    };
};

export const jsonParse = (str: string) => {
    try {
        if (!str) {
            return {};
        }
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
};

export const convertFilterWithWhere = (filter: PaginationQuery) => {
    if (!filter?.where) {
        return {};
    }
    return {
        ...insertIfObject(!!(typeof filter?.where === "string"), jsonParse(filter?.where as string), {
            ...filter?.where,
        }),
    };
};

export const changeToSlug = (title?: string) => {
    if (!title) return "";
    return slugify(title, {
        lower: true, // convert to lower case, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
};
