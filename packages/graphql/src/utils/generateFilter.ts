import { CrudFilters, LogicalFilter } from "@refinedev/core";

export const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: any } = {};

    if (filters) {
        filters.map((filter) => {
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, operator, value } = filter;

                if (operator === "eq") {
                    queryFilters[`${field}`] = value;
                } else {
                    queryFilters[`${field}_${operator}`] = value;
                }
            } else {
                const value = filter.value as LogicalFilter[];

                const orFilters: any[] = [];
                value.map((val) => {
                    orFilters.push({
                        [`${val.field}_${val.operator}`]: val.value,
                    });
                });

                queryFilters["_or"] = orFilters;
            }
        });
    }

    return queryFilters;
};
