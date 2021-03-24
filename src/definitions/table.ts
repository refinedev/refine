import qs, { StringifyOptions } from "query-string";

import { Sort, Filters } from "@interfaces";
import { SorterResult, SortOrder } from "antd/lib/table/interface";
import merge from "lodash/merge";

const queryStringOptions = (): StringifyOptions => {
    return {
        arrayFormat: "bracket",
        skipNull: false,
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
        parsedSorter: merge(parsedSorter, initialSorter),
        parsedFilters: merge(filters, initialFilter) as Filters,
    };
};

export const stringifyTableParams = (params: {
    sorter: Sort;
    filters: Filters;
}): string => {
    const { sorter, filters } = params;
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

    return `${qsFilters}&${qsSortFields}&${qsSortOrders}`;
};
