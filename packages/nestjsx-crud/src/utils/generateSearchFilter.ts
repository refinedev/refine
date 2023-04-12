import { SCondition } from "@nestjsx/crud-request";
import { CrudFilters } from "@refinedev/core";
import { createSearchQuery } from "./createSearchQuery";

export const generateSearchFilter = (filters: CrudFilters): SCondition => {
    return createSearchQuery({
        operator: "and",
        value: filters,
    });
};
