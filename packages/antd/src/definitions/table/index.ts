import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudFilter,
} from "@pankod/refine-core";
import { SortOrder, SorterResult } from "antd/lib/table/interface";

export const getDefaultSortOrder = (
    columnName: string,
    sorter?: CrudSorting,
): SortOrder | undefined => {
    if (!sorter) {
        return undefined;
    }

    const sortItem = sorter.find((item) => item.field === columnName);

    if (sortItem) {
        return `${sortItem.order}end` as SortOrder;
    }

    return undefined;
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
