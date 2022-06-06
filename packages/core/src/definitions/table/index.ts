import qs, { IStringifyOptions } from "qs";
import unionWith from "lodash/unionWith";
import reverse from "lodash/reverse";
import differenceWith from "lodash/differenceWith";

import {
    CrudFilters,
    CrudSorting,
    CrudFilter,
    CrudSort,
    CrudOperators,
    SortOrder,
} from "../../interfaces";

export const parseTableParams = (url: string) => {
    const { current, pageSize, sorter, filters } = qs.parse(
        url.substring(1), // remove first ? character
    );

    return {
        parsedCurrent: current && Number(current),
        parsedPageSize: pageSize && Number(pageSize),
        parsedSorter: (sorter as CrudSorting) ?? [],
        parsedFilters: (filters as CrudFilters) ?? [],
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
        arrayFormat: "indices",
        encode: false,
    };
    const { pagination, sorter, filters } = params;

    let queryString = `current=${pagination.current}&pageSize=${pagination.pageSize}`;

    const qsSorters = qs.stringify({ sorter }, options);
    if (qsSorters) {
        queryString += `&${qsSorters}`;
    }

    const qsFilters = qs.stringify({ filters }, options);
    if (qsFilters) {
        queryString += `&${qsFilters}`;
    }

    return queryString;
};

export const compareFilters = (
    left: CrudFilter,
    right: CrudFilter,
): boolean => {
    if (left.operator !== "or" && right.operator !== "or") {
        return left.field == right.field && left.operator == right.operator;
    }
    return false;
};

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

export const getDefaultSortOrder = (
    columnName: string,
    sorter?: CrudSorting,
): SortOrder | undefined => {
    if (!sorter) {
        return undefined;
    }

    const sortItem = sorter.find((item) => item.field === columnName);

    if (sortItem) {
        return sortItem.order as SortOrder;
    }

    return undefined;
};

export const getDefaultFilter = (
    columnName: string,
    filters?: CrudFilters,
    operatorType: CrudOperators = "eq",
): CrudFilter["value"] | undefined => {
    const filter = filters?.find((filter) => {
        if (filter.operator !== "or") {
            const { operator, field } = filter;
            return field === columnName && operator === operatorType;
        }
        return undefined;
    });

    if (filter) {
        return filter.value || [];
    }

    return undefined;
};
