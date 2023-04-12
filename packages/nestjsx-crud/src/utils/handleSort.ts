import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { CrudSorting } from "@refinedev/core";
import { generateSort } from "./generateSort";

export const handleSort = (
    query: RequestQueryBuilder,
    sorters?: CrudSorting,
) => {
    const sortBy = generateSort(sorters);
    if (sortBy) {
        query.sortBy(sortBy);
    }

    return query;
};
