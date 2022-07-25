import { useEffect } from "react";
import {
    BaseRecord,
    CrudOperators,
    HttpError,
    LogicalFilter,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType as useTableReturnTypeCore,
    useTableNoPaginationReturnType as useTableNoPaginationReturnTypeCore,
} from "@pankod/refine-core";
import {
    useReactTable,
    TableOptions,
    Table,
    getCoreRowModel,
} from "@tanstack/react-table";

export type UseTableReturnType<TData extends BaseRecord = BaseRecord> =
    Table<TData> & {
        refineCore: useTableReturnTypeCore<TData>;
    };

export type UseTableNoPaginationReturnType<
    TData extends BaseRecord = BaseRecord,
> = Table<TData> & {
    refineCore: useTableNoPaginationReturnTypeCore<TData>;
};

export type UseTableProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    refineCoreProps?: useTablePropsCore<TData, TError>;
} & Pick<TableOptions<TData>, "columns"> &
    Partial<Omit<TableOptions<TData>, "columns">>;

export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: UseTableProps<TData, TError> & {
        refineCoreProps?: useTablePropsCore<TData, TError> & {
            hasPagination?: true;
        };
    },
): UseTableReturnType<TData>;
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: UseTableProps<TData, TError> & {
        refineCoreProps?: useTablePropsCore<TData, TError> & {
            hasPagination: false;
        };
    },
): UseTableNoPaginationReturnType<TData>;
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    refineCoreProps: { hasPagination = true, ...refineCoreProps } = {},
    initialState: reactTableInitialState = {},
    ...rest
}: UseTableProps<TData, TError>):
    | UseTableReturnType<TData>
    | UseTableNoPaginationReturnType<TData> {
    const useTableResult = useTableCore<TData, TError>({
        ...refineCoreProps,
        // @ts-expect-error currently boolean casting is not supported in overloaded types.
        hasPagination,
    });

    const {
        tableQueryResult: { data },
        current,
        setCurrent,
        pageSize: pageSizeCore,
        setPageSize: setPageSizeCore,
        sorter,
        setSorter,
        filters: filtersCore,
        setFilters,
        pageCount,
    } = useTableResult;

    const logicalFilters: LogicalFilter[] = [];
    filtersCore.map((filter) => {
        if (filter.operator !== "or") {
            logicalFilters.push(filter);
        }
    });

    const reactTableResult = useReactTable<TData>({
        getCoreRowModel: getCoreRowModel(),
        data: data?.data ?? [],
        initialState: {
            ...(hasPagination
                ? {
                      pagination: {
                          pageIndex: (current ?? 1) - 1,
                          pageSize: pageSizeCore,
                      },
                  }
                : {}),
            sorting: sorter.map((sorting) => ({
                id: sorting.field,
                desc: sorting.order === "desc",
            })),
            columnFilters: logicalFilters.map((filter) => ({
                id: filter.field,
                value: filter.value,
            })),
            ...reactTableInitialState,
        },
        pageCount,
        manualPagination: hasPagination,
        manualSorting: true,
        manualFiltering: true,
        ...rest,
    });

    const { state, columns } = reactTableResult.options;
    const { pagination, sorting, columnFilters } = state;

    const { pageIndex, pageSize } = pagination ?? {};

    useEffect(() => {
        if (hasPagination && pageIndex !== undefined) {
            setCurrent(pageIndex + 1);
        }
    }, [pageIndex]);

    useEffect(() => {
        if (hasPagination && pageSize !== undefined) {
            setPageSizeCore(pageSize);
        }
    }, [pageSize]);

    useEffect(() => {
        if (sorting !== undefined) {
            setSorter(
                sorting?.map((sorting) => ({
                    field: sorting.id,
                    order: sorting.desc ? "desc" : "asc",
                })),
            );

            if (sorting.length > 0) {
                if (hasPagination) {
                    setCurrent(1);
                }
            }
        }
    }, [sorting]);

    useEffect(() => {
        const crudFilters: LogicalFilter[] = [];

        columnFilters?.map((filter) => {
            const operator = (columns.find((c) => c.id === filter.id) as any)
                ?.meta?.filterOperator as Exclude<CrudOperators, "or">;

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

        if (crudFilters.length > 0) {
            if (hasPagination) {
                setCurrent(1);
            }
        }
    }, [columnFilters]);

    if (hasPagination) {
        return {
            ...reactTableResult,
            refineCore: useTableResult,
        };
    }

    return {
        ...reactTableResult,
        refineCore: {
            ...(useTableResult as unknown as useTableNoPaginationReturnTypeCore<TData>),
            current: undefined,
            setCurrent: undefined,
            pageSize: undefined,
            setPageSize: undefined,
            pageCount: undefined,
        },
    };
}
