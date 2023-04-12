import { CrudFilter } from "@refinedev/core";
import { SCondition } from "@nestjsx/crud-request";
import { mapOperator } from "./mapOperator";

export const createSearchQuery = (filter: CrudFilter): SCondition => {
    if (
        filter.operator !== "and" &&
        filter.operator !== "or" &&
        "field" in filter
    ) {
        // query
        return {
            [filter.field]: {
                [mapOperator(filter.operator)]: filter.value,
            },
        };
    }

    const { operator } = filter;

    return {
        [mapOperator(operator)]: filter.value.map((filter) =>
            createSearchQuery(filter),
        ),
    };
};
