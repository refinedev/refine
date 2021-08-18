import qs, { IStringifyOptions } from "qs";

import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudFilter,
    CrudSort,
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
        sorter.map((item) => {
            if (item.field && item.order) {
                crudSorting.push({
                    field: `${item.columnKey}`,
                    order: item.order.replace("end", "") as "asc" | "desc",
                });
            }
        });
    } else {
        if (sorter.field && sorter.order) {
            crudSorting.push({
                field: `${sorter.columnKey}`,
                order: sorter.order.replace("end", "") as "asc" | "desc",
            });
        }
    }

    return crudSorting;
};

export const mapAntdFilterToCrudFilter = (
    filters: Record<string, (string | number | boolean)[] | null>,
): CrudFilters => {
    const crudFilters: CrudFilters = [];
    Object.keys(filters).map((field) => {
        const value = filters[field];

        if (value) {
            crudFilters.push({
                field,
                operator: "in",
                value,
            });
        }
    });

    return crudFilters;
};

export const compareFilters = (
    left: CrudFilter,
    right: CrudFilter,
): boolean => {
    const specialOperators: CrudOperators[] = ["gte", "lte", "ne", "contains"];

    const specialCase = [left.operator, right.operator]
        .map((o) => specialOperators.includes(o))
        .includes(true);

    return (
        left.field == right.field &&
        (specialCase ? left.operator == right.operator : true)
    );
};
