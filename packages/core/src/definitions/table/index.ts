import qs, { IStringifyOptions } from "qs";

import { Sort, CrudFilters, CrudOperators } from "../../interfaces";
import {
    SorterResult,
    SortOrder,
    TablePaginationConfig,
} from "antd/lib/table/interface";
import mergeWith from "lodash/mergeWith";

export const merge = (object: any, source: any) => {
    return mergeWith(object, source, (val, src): any => {
        if (Array.isArray(val)) {
            return val.concat(src);
        }
    });
};

export const parseTableParams = (url: string) => {
    const { current, pageSize, sort, order, ...filters } = qs.parse(
        url.substring(1), // remove first ? character
    );

    let parsedSorter: Sort = [];
    if (Array.isArray(sort) && Array.isArray(order)) {
        const arrSorter: SorterResult<any>[] = [];

        sort.forEach((item: any, index: any) => {
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
    sorter: Sort;
    filters: CrudFilters;
}): string => {
    const options: IStringifyOptions = {
        skipNulls: true,
        arrayFormat: "brackets",
        encode: false,
    };

    const { pagination, sorter, filters } = params;

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
    const value = filters?.find(({ field }) => field === columnName);

    if (value) {
        return value.value || [];
    }

    return undefined;
};
