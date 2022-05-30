import { useEffect, useMemo } from "react";
import {
    BaseRecord,
    CrudOperators,
    HttpError,
    LogicalFilter,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType,
} from "@pankod/refine-core";
import { useTable as useTableRT, PluginHook, TableOptions } from "react-table";

export type UseTableReturnType<TData extends BaseRecord = BaseRecord> =
    ReturnType<typeof useTableRT> & {
        refineCore: useTableReturnType<TData>;
    };

export type UseTableProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    refineCoreProps?: useTablePropsCore<TData, TError>;
} & TableOptions<{}>;

export const useTable = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    { refineCoreProps, ...rest }: UseTableProps<TData, TError>,
    ...plugins: Array<PluginHook<{}>>
): UseTableReturnType<TData> => {
    const useTableResult = useTableCore<TData, TError>({
        ...refineCoreProps,
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
                pageIndex: current - 1,
                pageSize: pageSizeCore,
                sortBy: sorter.map((sorting) => ({
                    id: sorting.field,
                    desc: sorting.order === "desc",
                })),
                filters: logicalFilters.map((filter) => ({
                    id: filter.field,
                    value: filter.value,
                })),
            },
            pageCount: pageCount,
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
            sortBy?.map((sorting) => ({
                field: sorting.id,
                order: sorting.desc ? "desc" : "asc",
            })),
        );
        if (sortBy?.length) {
            setCurrent(1);
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
            setCurrent(1);
        }
    }, [filters]);

    return {
        ...reactTableResult,
        refineCore: useTableResult,
    };
};
