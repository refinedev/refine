import {
    CrudOperators,
    LogicalFilter,
    CrudSorting,
    Pagination,
} from "@refinedev/core";
import camelcase from "camelcase";
import VariableOptions from "gql-query-builder/build/VariableOptions";
import * as gql from "gql-query-builder";
import { singular } from "pluralize";

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

export const generateCreatedSubscription = ({
    resource,
    filters,
    meta,
}: any) => {
    const operation = `created${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `create_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(filters as LogicalFilter[]),
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: queryVariables,
    });

    return { query, variables, operation };
};

export const generateUpdatedSubscription = ({
    resource,
    filters,
    meta,
}: any) => {
    const operation = `updatedOne${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `update_one_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(filters as LogicalFilter[]),
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: queryVariables,
    });

    return { query, variables, operation };
};

export const generateDeletedSubscription = ({
    resource,
    filters,
    meta,
}: any) => {
    const operation = `deletedOne${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `delete_one_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(filters as LogicalFilter[]),
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: queryVariables,
    });

    return { query, variables, operation };
};
