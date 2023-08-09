import {
    CrudOperators,
    LogicalFilter,
    CrudSorting,
    Pagination,
} from "@refinedev/core";

const operatorMap: { [key: string]: string } = {
    eq: "eq",
    ne: "neq",
    lt: "lt",
    gt: "gt",
    lte: "lte",
    gte: "gte",
    in: "in",
    nin: "notIn",
};

const operatorMapper = (
    operator: CrudOperators,
    value: any,
): { [key: string]: any } => {
    if (operator === "contains") {
        return { iLike: `%${value}%` };
    }

    if (operator === "ncontains") {
        return { notILike: `%${value}%` };
    }

    if (operator === "startswith") {
        return { iLike: `${value}%` };
    }

    if (operator === "nstartswith") {
        return { notILike: `${value}%` };
    }

    if (operator === "endswith") {
        return { iLike: `%${value}` };
    }

    if (operator === "nendswith") {
        return { notILike: `%${value}` };
    }

    if (operator === "null") {
        return { is: "null" };
    }

    if (operator === "nnull") {
        return { isNot: "null" };
    }

    return { [operatorMap[operator]]: value };
};

export const generateFilters = (filters: LogicalFilter[]) => {
    const result: { [key: string]: { [key: string]: string | number } } = {};

    filters.map((filter: LogicalFilter) => {
        result[filter.field] = operatorMapper(filter.operator, filter.value);
    });

    return result;
};

export const generateSorting = (sorters: CrudSorting) => {
    return sorters.map((sorter) => {
        return {
            field: sorter.field,
            direction: sorter.order.toUpperCase(),
        };
    });
};

export const generatePaging = (pagination: Pagination) => {
    if (pagination.mode !== "server") return undefined;

    if (!pagination.current || !pagination.pageSize) return undefined;

    return {
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
    };
};
