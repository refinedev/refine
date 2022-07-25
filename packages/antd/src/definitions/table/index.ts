import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudFilter,
    getDefaultFilter as getDefaultFilterCore,
    getDefaultSortOrder as getDefaultSortOrderCore,
} from "@pankod/refine-core";
import { SortOrder, SorterResult } from "antd/lib/table/interface";

export const getDefaultSortOrder = (
    columnName: string,
    sorter?: CrudSorting,
): SortOrder | undefined => {
    const sort = getDefaultSortOrderCore(columnName, sorter);

    if (sort) {
        return `${sort}end`;
    }

    return undefined;
};

/**
 * @deprecated getDefaultFilter moved to `@pankod/refine-core`. Use from `@pankod/refine-core`
 */
export const getDefaultFilter = (
    columnName: string,
    filters?: CrudFilters,
    operatorType: CrudOperators = "eq",
): CrudFilter["value"] | undefined => {
    return getDefaultFilterCore(columnName, filters, operatorType);
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
        const operator = prevFilters
            .filter((i) => i.operator !== "or")
            .find((p: any) => p.field === field)?.operator;

        if (operator !== "or") {
            crudFilters.push({
                field,
                operator: operator ?? (Array.isArray(value) ? "in" : "eq"),
                value,
            });
        }
    });

    return crudFilters;
};
