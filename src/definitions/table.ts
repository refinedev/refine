import qs, { StringifyOptions } from "query-string";

import { Sort, Filters } from "@interfaces";
import {
    SorterResult,
    SortOrder,
    TablePaginationConfig,
} from "antd/lib/table/interface";
import merge from "lodash/merge";

const queryStringOptions = (): StringifyOptions => {
    return {
        arrayFormat: "bracket",
        skipNull: true,
    };
};

export const parseTableParams = (params: {
    initialSorter?: Sort;
    initialFilter?: Filters;
    url: string;
}) => {
    const options = queryStringOptions();
    const { initialSorter, initialFilter, url } = params;

    const { current, pageSize, sort, order, ...filters } = qs.parse(
        url,
        options,
    );

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

    return {
        parsedCurrent: current && Number(current),
        parsedPageSize: pageSize && Number(pageSize),
        parsedSorter: merge(initialSorter, parsedSorter),
        parsedFilters: merge(initialFilter, filters) as Filters,
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

    return `current=${pagination.current}&pageSize=${pagination.pageSize}&${qsFilters}&${qsSortFields}&${qsSortOrders}`;
};

export const getDefaultSortOrder = (
    columnName: string,
    sorter: Sort,
): SortOrder | undefined => {
    if (Array.isArray(sorter)) {
        const sortItem = sorter.find((item) => item.field === columnName);

        if (sortItem) {
            return sortItem.order;
        }

        return;
    }

    if (sorter.field === columnName) {
        return sorter.order || undefined;
    }

    return;
};
