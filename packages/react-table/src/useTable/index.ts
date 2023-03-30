import { useEffect } from "react";
import {
    BaseRecord,
    CrudOperators,
    HttpError,
    LogicalFilter,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType as useTableReturnTypeCore,
} from "@refinedev/core";
import {
    useReactTable,
    TableOptions,
    Table,
    getCoreRowModel,
    ColumnFilter,
} from "@tanstack/react-table";

import { useIsFirstRender } from "../utils";

export type UseTableReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = Table<TData> & {
    refineCore: useTableReturnTypeCore<TData, TError>;
};

export type UseTableProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    /**
     * Configuration object for the core of the [useTable](/docs/api-reference/core/hooks/useTable/)
     * @type [`useTablePropsCore<TData, TError>`](/docs/api-reference/core/hooks/useTable/#properties)
     */
    refineCoreProps?: useTablePropsCore<TData, TError>;
} & Pick<TableOptions<TData>, "columns"> &
    Partial<Omit<TableOptions<TData>, "columns">>;

export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    refineCoreProps: { hasPagination = true, ...refineCoreProps } = {},
    initialState: reactTableInitialState = {},
    ...rest
}: UseTableProps<TData, TError>): UseTableReturnType<TData, TError> {
    const isFirstRender = useIsFirstRender();

    const useTableResult = useTableCore<TData, TError>({
        ...refineCoreProps,
        hasPagination,
    });

    const hasPaginationString = hasPagination === false ? "off" : "server";
    const isPaginationEnabled =
        (refineCoreProps.pagination?.mode ?? hasPaginationString) !== "off";

    const {
        tableQueryResult: { data },
        current,
        setCurrent,
        pageSize: pageSizeCore,
        setPageSize: setPageSizeCore,
        sorters,
        setSorters,
        filters: filtersCore,
        setFilters,
        pageCount,
    } = useTableResult;

    const logicalFilters: LogicalFilter[] = [];
    filtersCore.forEach((filter) => {
        if (
            filter.operator !== "or" &&
            filter.operator !== "and" &&
            "field" in filter
        ) {
            logicalFilters.push(filter);
        }
    });

    const reactTableResult = useReactTable<TData>({
        getCoreRowModel: getCoreRowModel(),
        data: data?.data ?? [],
        initialState: {
            pagination: {
                pageIndex: current - 1,
                pageSize: pageSizeCore,
            },
            sorting: sorters.map((sorting) => ({
                id: sorting.field,
                desc: sorting.order === "desc",
            })),
            columnFilters: logicalFilters.map((filter) => ({
                id: filter.field,
                operator: filter.operator as Exclude<
                    CrudOperators,
                    "or" | "and"
                >,
                value: filter.value,
            })),
            ...reactTableInitialState,
        },
        pageCount,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        ...rest,
    });

    const { state, columns } = reactTableResult.options;
    const { pagination, sorting, columnFilters } = state;

    const { pageIndex, pageSize } = pagination ?? {};

    useEffect(() => {
        if (pageIndex !== undefined) {
            setCurrent(pageIndex + 1);
        }
    }, [pageIndex]);

    useEffect(() => {
        if (pageSize !== undefined) {
            setPageSizeCore(pageSize);
        }
    }, [pageSize]);

    useEffect(() => {
        if (sorting !== undefined) {
            setSorters(
                sorting?.map((sorting) => ({
                    field: sorting.id,
                    order: sorting.desc ? "desc" : "asc",
                })),
            );

            if (sorting.length > 0 && isPaginationEnabled && !isFirstRender) {
                setCurrent(1);
            }
        }
    }, [sorting]);

    useEffect(() => {
        const crudFilters: LogicalFilter[] = [];

        columnFilters?.map((filter) => {
            const operator =
                (
                    filter as ColumnFilter & {
                        operator?: Exclude<CrudOperators, "or" | "and">;
                    }
                ).operator ??
                ((columns.find((c) => c.id === filter.id) as any)?.meta
                    ?.filterOperator as Exclude<CrudOperators, "or" | "and">);

            crudFilters.push({
                field: filter.id,
                operator:
                    operator ?? (Array.isArray(filter.value) ? "in" : "eq"),
                value: filter.value,
            });
        });

        const filteredArray = logicalFilters.filter(
            (value) =>
                !crudFilters.some(
                    (b) =>
                        value.field === b.field &&
                        value.operator === b.operator,
                ),
        );

        filteredArray?.map((filter) => {
            crudFilters.push({
                field: filter.field,
                operator: filter.operator,
                value: undefined,
            });
        });

        setFilters(crudFilters);

        if (crudFilters.length > 0 && isPaginationEnabled && !isFirstRender) {
            setCurrent(1);
        }
    }, [columnFilters]);

    return {
        ...reactTableResult,
        refineCore: useTableResult,
    };
}
