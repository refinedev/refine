import { CrudFilter } from "@refinedev/core";
import { Query } from "appwrite";

export const generateFilter = (filter: CrudFilter) => {
    switch (filter.operator) {
        case "eq":
            return Query.equal(filter.field, filter.value);
        case "ne":
            return Query.notEqual(filter.field, filter.value);
        case "gt":
            return Query.greaterThan(filter.field, filter.value);
        case "gte":
            return Query.greaterThanEqual(filter.field, filter.value);
        case "lt":
            return Query.lessThan(filter.field, filter.value);
        case "lte":
            return Query.lessThanEqual(filter.field, filter.value);
        case "contains":
            return Query.search(filter.field, `%${filter.value}%`);
        default:
            throw new Error(`Operator ${filter.operator} is not supported`);
    }
};
