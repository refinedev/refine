import { useEffect, useMemo } from "react";
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
import { useTable as useTableRT, PluginHook, TableOptions } from "react-table";

export type UseTableReturnType<TData extends BaseRecord = BaseRecord> =
    ReturnType<typeof useTableRT> & {
        refineCore: useTableReturnTypeCore<TData>;
    };

export type UseTableNoPaginationReturnType<
    TData extends BaseRecord = BaseRecord,
> = ReturnType<typeof useTableRT> & {
    refineCore: useTableNoPaginationReturnTypeCore<TData>;
};

export type UseTableProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    refineCoreProps?: useTablePropsCore<TData, TError>;
} & TableOptions<{}>;

export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: UseTableProps<TData, TError> & { hasPagination?: true },
    ...plugins: Array<PluginHook<{}>>
): UseTableReturnType<TData>;
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props: UseTableProps<TData, TError> & { hasPagination: false },
    ...plugins: Array<PluginHook<{}>>
): UseTableNoPaginationReturnType<TData>;
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    {
        refineCoreProps: { hasPagination = true, ...refineCoreProps } = {},
        ...rest
    }: UseTableProps<TData, TError>,
    ...plugins: Array<PluginHook<{}>>
): UseTableReturnType<TData> | UseTableNoPaginationReturnType<TData> {
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

    const memoizedData = useMemo(() => data?.data ?? [], [data]);
    const reactTableResult = useTableRT(
        {
            data: memoizedData,
            initialState: {
                ...(hasPagination
                    ? {
                          pageIndex: (current ?? 1) - 1,
                          pageSize: pageSizeCore,
                          pageCount,
                      }
                    : {}),
                sortBy: sorter.map((sorting) => ({
                    id: sorting.field,
                    desc: sorting.order === "desc",
                })),
                filters: logicalFilters.map((filter) => ({
                    id: filter.field,
                    value: filter.value,
                })),
            },
            manualPagination: true,
            manualSortBy: true,
            manualFilters: true,
            ...rest,
        },
        ...plugins,
    );

    const { pageIndex, pageSize, sortBy, filters } = reactTableResult.state;

    useEffect(() => {
        if (hasPagination) {
            setCurrent(pageIndex + 1);
        }
    }, [pageIndex]);

    useEffect(() => {
        if (hasPagination) {
            setPageSizeCore(pageSize);
        }
    }, [pageSize]);

    useEffect(() => {
        setSorter(
            sortBy?.map((sorting) => ({
                field: sorting.id,
                order: sorting.desc ? "desc" : "asc",
            })),
        );
        if (sortBy?.length) {
            if (hasPagination) {
                setCurrent(1);
            }
        }
    }, [sortBy]);

    useEffect(() => {
        const crudFilters: LogicalFilter[] = [];

        filters?.map((filter) => {
            const operator = reactTableResult.columns.find(
                (c) => c.id === filter.id,
            )?.filter as Exclude<CrudOperators, "or">;

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
    }, [filters]);

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
