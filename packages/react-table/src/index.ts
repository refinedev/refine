import { useEffect } from "react";
import {
    BaseRecord,
    CrudOperators,
    HttpError,
    useTable as useTableCore,
    useTableProps,
} from "@pankod/refine-core";
import { useTable as useTableRT, PluginHook, TableOptions } from "react-table";

export type UseTableReturnType = ReturnType<typeof useTableRT> & {
    useTableCore: ReturnType<typeof useTableCore>;
};

export type UseTableProps<
    // D extends object = {},
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
> = {
    refineTableProps?: useTableProps<TData, TError, TSearchVariables>;
} & Partial<TableOptions<{}>>;
// } & TableOptions<D>;

export const useTable = <
    // D extends object = {},
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>(
    {
        refineTableProps,
        ...rest
    }: UseTableProps<TData, TError, TSearchVariables>,
    ...plugins: Array<PluginHook<{}>>
): // ...plugins: Array<PluginHook<D>>
UseTableReturnType => {
    const useTableResult = useTableCore({
        ...refineTableProps,
    });

    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize: pageSizeCore,
        setPageSize: setPageSizeCore,
        sorter,
        setSorter,
        filters: filtersCore,
        setFilters,
    } = useTableResult;

    const { data } = tableQueryResult;

    const reactTableResult = useTableRT(
        {
            data: data?.data || [],
            columns: [],
            initialState: {
                pageIndex: current - 1,
                pageSize: pageSizeCore,
                sortBy: sorter.map((sorting) => ({
                    id: sorting.field,
                    desc: sorting.order === "desc",
                })),
                filters: filtersCore.map((filter) => ({
                    id: filter.field,
                    value: filter.value,
                })),
            },
            pageCount: Math.ceil((data?.total || 0) / pageSizeCore),
            manualPagination: true,
            manualSortBy: true,
            manualFilters: true,
            ...rest,
        },
        ...plugins,
    );

    const { pageIndex, pageSize, sortBy, filters } = reactTableResult.state;

    useEffect(() => {
        setCurrent(pageIndex + 1);
    }, [pageIndex]);

    useEffect(() => {
        setPageSizeCore(pageSize);
    }, [pageSize]);

    useEffect(() => {
        setSorter(
            sortBy.map((sorting) => ({
                field: sorting.id,
                order: sorting.desc ? "desc" : "asc",
            })),
        );
    }, [sortBy]);

    useEffect(() => {
        setFilters(
            filters.map((filter) => {
                const operator = reactTableResult.columns.find(
                    (c) => c.id === filter.id,
                )?.filter as CrudOperators;

                return {
                    field: filter.id,
                    value: filter.value,
                    operator,
                };
            }),
        );
    }, [filters]);

    return {
        ...reactTableResult,
        useTableCore: useTableResult,
    };
};
