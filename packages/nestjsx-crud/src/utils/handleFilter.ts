import { CrudFilters } from "@refinedev/core";
import { generateSearchFilter } from "./generateSearchFilter";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

export const handleFilter = (
    query: RequestQueryBuilder,
    filters?: CrudFilters,
) => {
    if (filters) {
        query.search(generateSearchFilter(filters));
    }
    return query;
};
