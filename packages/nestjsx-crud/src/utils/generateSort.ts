import {
    QuerySort,
    QuerySortArr,
    QuerySortOperator,
} from "@nestjsx/crud-request";
import { CrudSorting } from "@refinedev/core";

export type SortBy = QuerySort | QuerySortArr | Array<QuerySort | QuerySortArr>;

export const generateSort = (sort?: CrudSorting): SortBy | undefined => {
    if (sort && sort.length > 0) {
        const multipleSort: SortBy = [];
        sort.map(({ field, order }) => {
            if (field && order) {
                multipleSort.push({
                    field: field,
                    order: order.toUpperCase() as QuerySortOperator,
                });
            }
        });
        return multipleSort;
    }

    return;
};
