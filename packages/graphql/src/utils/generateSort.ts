import { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters?: CrudSorting) => {
    if (sorters && sorters.length > 0) {
        const sortQuery = sorters.map((i) => {
            return `${i.field}:${i.order}`;
        });

        return sortQuery.join();
    }

    return [];
};

/**
 * @deprecated Please use `generateSort` instead.
 */
export const genereteSort = generateSort;
