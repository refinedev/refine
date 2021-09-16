import qs, { IStringifyOptions } from "qs";
import unionWith from "lodash/unionWith";
import reverse from "lodash/reverse";
import differenceWith from "lodash/differenceWith";

import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudFilter,
} from "../../interfaces";
import {
    SortOrder,
    TablePaginationConfig,
    SorterResult,
} from "antd/lib/table/interface";

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
        parsedFilters.push({
            field,
            operator: operator as CrudOperators,
            value,
        });
    });

    return {
        parsedCurrent: current && Number(current),
        parsedPageSize: pageSize && Number(pageSize),
        parsedSorter,
        parsedFilters,
    };
};

export const stringifyTableParams = (params: {
    pagination: TablePaginationConfig;
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

export const getDefaultSortOrder = (
    columnName: string,
    sorter?: CrudSorting,
): SortOrder | undefined => {
    if (!sorter) {
        return;
    }

    const sortItem = sorter.find((item) => item.field === columnName);

    if (sortItem) {
        return `${sortItem.order}end` as SortOrder;
    }

    return;
};

export const getDefaultFilter = (
    columnName: string,
    filters?: CrudFilters,
    operatorType: CrudOperators = "eq",
): CrudFilter["value"] | undefined => {
    const filter = filters?.find(
        ({ field, operator }) =>
            field === columnName && operator === operatorType,
    );

    if (filter) {
        return filter.value || [];
    }

    return undefined;
};

export const mapAntdSorterToCrudSorting = (
    sorter: SorterResult<any> | SorterResult<any>[],
): CrudSorting => {
    const crudSorting: CrudSorting = [];
    if (Array.isArray(sorter)) {
        sorter
            .sort((a, b) => {
                return ((a.column?.sorter as { multiple?: number }).multiple ??
                    0) <
                    ((b.column?.sorter as { multiple?: number }).multiple ?? 0)
                    ? -1
                    : 0;
            })
            .map((item) => {
                if (item.field && item.order) {
                    crudSorting.push({
                        field: `${item.columnKey ?? item.field}`,
                        order: item.order.replace("end", "") as "asc" | "desc",
                    });
                }
            });
    } else {
        if (sorter.field && sorter.order) {
            crudSorting.push({
                field: `${sorter.columnKey ?? sorter.field}`,
                order: sorter.order.replace("end", "") as "asc" | "desc",
            });
        }
    }

    return crudSorting;
};

export const mapAntdFilterToCrudFilter = (
    tableFilters: Record<
        string,
        (string | number | boolean) | (string | number | boolean)[] | null
    >,
    prevFilters: CrudFilters,
): CrudFilters => {
    const crudFilters: CrudFilters = [];

    Object.keys(tableFilters).map((field) => {
        const value = tableFilters[field];
        const operator = prevFilters.find((p) => p.field === field)?.operator;

        crudFilters.push({
            field,
            operator: operator ?? (Array.isArray(value) ? "in" : "eq"),
            value,
        });
    });

    return crudFilters;
};

export const compareFilters = (left: CrudFilter, right: CrudFilter): boolean =>
    left.field == right.field && left.operator == right.operator;

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

// Prioritize filters in the permanentFilter and put it at the end of result array
export const setInitialFilters = (
    permanentFilter: CrudFilters,
    defaultFilter: CrudFilters,
): CrudFilters => [
    ...differenceWith(defaultFilter, permanentFilter, compareFilters),
    ...permanentFilter,
];
