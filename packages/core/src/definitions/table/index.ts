import qs, { StringifyOptions } from "query-string";

import { Sort, Filters, CrudFilters } from "../../interfaces";
import {
    SorterResult,
    SortOrder,
    TablePaginationConfig,
} from "antd/lib/table/interface";
import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import get from "lodash/get";

const queryStringOptions = (): StringifyOptions => {
    return {
        arrayFormat: "bracket",
        skipNull: true,
    };
};

export const merge = (object: any, source: any) => {
    return mergeWith(object, source, (val, src): any => {
        if (isArray(val)) {
            return val.concat(src);
        }
    });
};

export const parseTableParams = (params: {
    initialSorter?: Sort;
    initialFilter?: CrudFilters;
    url: string;
}) => {
    const options = queryStringOptions();
    const { initialSorter, initialFilter, url } = params;

    const { current, pageSize, sort, order, ...filters } = qs.parse(
        url,
        options,
    );

    console.log("parseTableParams", filters);

    let parsedSorter: Sort;
    if (Array.isArray(sort) && Array.isArray(order)) {
        const arrSorter: SorterResult<any>[] = [];

        sort.map((item, index) => {
            const sortOrder = order[index] as SortOrder;
            arrSorter.push({
                field: item,
                order: sortOrder,
            });
        });

        parsedSorter = arrSorter;
    } else {
        parsedSorter = [
            {
                field: sort as string,
                order: order as SortOrder,
            },
        ];
    }


    let parsedFilters: CrudFilters = [];
    if (filters) {
        const crudFilters: CrudFilters = [];
        Object.keys(filters).map((field) => {
            if (filters[field]) {
                crudFilters.push({
                    field,
                    operator: "$in",
                    value: filters[field],
                });
            }
        });
        parsedFilters = crudFilters;
    }

    console.log("parsedFilters", parsedFilters)

    return {
        parsedCurrent: current && Number(current),
        parsedPageSize: pageSize && Number(pageSize),
        parsedSorter: merge(initialSorter, parsedSorter),
        parsedFilters: [...initialFilter || [], ...parsedFilters || []],
        // merge(initialFilter, filters) as Filters,
        // parsedFilters: [...initialFilter || [], ...filters || []]
    };
};

export const stringifyTableParams = (params: {
    pagination: TablePaginationConfig;
    sorter: Sort;
    filters: Filters;
}): string => {
    const { pagination, sorter, filters } = params;
    const options = queryStringOptions();

    const qsFilters = qs.stringify(filters, options);
    let sortFields;
    let sortOrders;

    if (Array.isArray(sorter)) {
        sortFields = sorter.map((item) => item.field);
        sortOrders = sorter.map((item) => item.order);
    } else {
        sortFields = sorter.field;
        sortOrders = sorter.order;
    }

    const qsSortFields = qs.stringify({ sort: sortFields }, options);
    const qsSortOrders = qs.stringify({ order: sortOrders }, options);

    let queryString = `current=${pagination.current}&pageSize=${pagination.pageSize}`;

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
    sorter?: Sort,
): SortOrder | undefined => {
    if (Array.isArray(sorter)) {
        const sortItem = sorter.find((item) => item.field === columnName);

        if (sortItem) {
            return sortItem.order;
        }

        return;
    }

    if (sorter?.field === columnName) {
        return sorter.order || undefined;
    }

    return;
};

export const getDefaultFilter = (
    columnName: string,
    filters?: CrudFilters,
): string[] | undefined => {
    console.log("getDefaultFilter", filters)


    const value = get(filters, columnName);
    if (!filters || !value) {
        return undefined;
    }

    return (value ?? []) as string[];
};
