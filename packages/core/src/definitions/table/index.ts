import qs, { IStringifyOptions } from "qs";

import { CrudFilters, CrudOperators, CrudSorting } from "../../interfaces";
import {
    SorterResult,
    SortOrder,
    TablePaginationConfig,
} from "antd/lib/table/interface";
import mergeWith from "lodash/mergeWith";

export const merge = <T>(object: T, source: T): T => {
    return mergeWith(object, source, (val, src) => {
        if (Array.isArray(val)) {
            return val.concat(src);
        }

        return undefined;
    });
};

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
): string[] | undefined => {
    const value = filters?.find(({ field }) => field === columnName);

    if (value) {
        return value.value || [];
    }

    return undefined;
};
