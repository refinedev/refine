import qs, { IStringifyOptions } from "qs";
import unionWith from "lodash/unionWith";
import reverse from "lodash/reverse";
import differenceWith from "lodash/differenceWith";

import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudFilter,
    CrudSort,
} from "../../interfaces";

export const parseTableParams = (url: string) => {
    const { current, pageSize, sort, order, ...filters } = qs.parse(
        url.substring(1), // remove first ? character
    );

    const parsedSorter: CrudSorting = [];
    if (Array.isArray(sort) && Array.isArray(order)) {
        sort.forEach((item: unknown, index: number) => {
            const sortOrder = order[index] as "asc" | "desc";

            parsedSorter.push({
                field: `${item}`,
                order: sortOrder,
            });
        });
    }

    const parsedFilters: CrudFilters = [];
    Object.keys(filters).map((item) => {
        const [field, operator] = item.split("__");
        const value = filters[item];
        if (operator) {
            parsedFilters.push({
                field,
                operator: operator as CrudOperators,
                value,
            });
        }
    });

    return {
        parsedCurrent: current && Number(current),
        parsedPageSize: pageSize && Number(pageSize),
        parsedSorter,
        parsedFilters,
    };
};

export const parseTableParamsFromQuery = (params: any) => {
    const url = qs.stringify(params);
    return parseTableParams(`/${url}`);
};

export const stringifyTableParams = (params: {
    pagination: { current?: number; pageSize?: number };
    sorter: CrudSorting;
    filters: CrudFilters;
}): string => {
    const options: IStringifyOptions = {
        skipNulls: true,
        arrayFormat: "brackets",
        encode: false,
    };

    const { pagination, sorter, filters } = params;

    const sortFields = sorter.map((item) => item.field);
    const sortOrders = sorter.map((item) => item.order);

    const qsSortFields = qs.stringify({ sort: sortFields }, options);
    const qsSortOrders = qs.stringify({ order: sortOrders }, options);

    let queryString = `current=${pagination.current}&pageSize=${pagination.pageSize}`;

    const qsFilterItems: { [key: string]: string } = {};
    filters.map((filterItem) => {
        qsFilterItems[`${filterItem.field}__${filterItem.operator}`] =
            filterItem.value;
    });

    const qsFilters = qs.stringify(qsFilterItems, options);
    if (qsFilters) {
        queryString = `${queryString}&${qsFilters}`;
    }

    if (qsSortFields && qsSortOrders) {
        queryString = `${queryString}&${qsSortFields}&${qsSortOrders}`;
    }

    return queryString;
};

export const compareFilters = (left: CrudFilter, right: CrudFilter): boolean =>
    left.field == right.field && left.operator == right.operator;

export const compareSorters = (left: CrudSort, right: CrudSort): boolean =>
    left.field == right.field;
// Keep only one CrudFilter per type according to compareFilters
// Items in the array that is passed first to unionWith have higher priority
// CrudFilter items with undefined values are necessary to signify no filter
// After union, don't keep CrudFilter items with undefined value in the result
// Items in the arrays with higher priority are put at the end.
export const unionFilters = (
    permanentFilter: CrudFilters,
    newFilters: CrudFilters,
    prevFilters: CrudFilters,
): CrudFilters =>
    reverse(
        unionWith(permanentFilter, newFilters, prevFilters, compareFilters),
    ).filter(
        (crudFilter) =>
            crudFilter.value !== undefined && crudFilter.value !== null,
    );

export const unionSorters = (
    permanentSorter: CrudSorting,
    newSorters: CrudSorting,
): CrudSorting =>
    reverse(unionWith(permanentSorter, newSorters, compareSorters)).filter(
        (crudSorter) =>
            crudSorter.order !== undefined && crudSorter.order !== null,
    );
// Prioritize filters in the permanentFilter and put it at the end of result array
export const setInitialFilters = (
    permanentFilter: CrudFilters,
    defaultFilter: CrudFilters,
): CrudFilters => [
    ...differenceWith(defaultFilter, permanentFilter, compareFilters),
    ...permanentFilter,
];

export const setInitialSorters = (
    permanentSorter: CrudSorting,
    defaultSorter: CrudSorting,
): CrudSorting => [
    ...differenceWith(defaultSorter, permanentSorter, compareSorters),
    ...permanentSorter,
];
