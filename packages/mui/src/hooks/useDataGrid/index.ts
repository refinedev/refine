import { useState, useMemo } from "react";
import {
    BaseRecord,
    CrudFilters,
    HttpError,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType as useTableReturnTypeCore,
    useTableNoPaginationReturnType as useTableNoPaginationReturnTypeCore,
    useLiveMode,
} from "@pankod/refine-core";
import {
    DataGridProps,
    GridFilterModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { useTheme, darken } from "@mui/material";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

import {
    transformCrudSortingToSortModel,
    transformSortModelToCrudSorting,
    transformFilterModelToCrudFilters,
    transformCrudFiltersToFilterModel,
} from "@definitions";

type DataGridPropsType = Pick<DataGridProps, "filterModel"> &
    Required<
        Pick<
            DataGridProps,
            | "rows"
            | "loading"
            | "rowCount"
            | "sortingMode"
            | "sortModel"
            | "onSortModelChange"
            | "filterMode"
            | "onFilterModelChange"
            | "sx"
            | "disableSelectionOnClick"
            | "onStateChange"
        >
    > &
    Pick<
        DataGridProps,
        | "hideFooterPagination"
        | "paginationMode"
        | "page"
        | "onPageChange"
        | "pageSize"
        | "onPageSizeChange"
    >;

export type UseDataGridProps<TData, TError, TSearchVariables = unknown> =
    useTablePropsCore<TData, TError> & {
        onSearch?: (
            data: TSearchVariables,
        ) => CrudFilters | Promise<CrudFilters>;
    };

export type UseDataGridReturnType<
    TData extends BaseRecord = BaseRecord,
    TSearchVariables = unknown,
> = useTableReturnTypeCore<TData> & {
    dataGridProps: DataGridPropsType;
    search: (value: TSearchVariables) => Promise<void>;
};

export type UseDataGridNoPaginationReturnType<
    TData extends BaseRecord = BaseRecord,
    TSearchVariables = unknown,
> = useTableNoPaginationReturnTypeCore<TData> & {
    dataGridProps: DataGridPropsType;
    search: (value: TSearchVariables) => Promise<void>;
};

export function useDataGrid<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>(
    props?: UseDataGridProps<TData, TError, TSearchVariables> & {
        hasPagination?: true;
    },
): UseDataGridReturnType<TData, TSearchVariables>;
export function useDataGrid<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>(
    props?: UseDataGridProps<TData, TError, TSearchVariables> & {
        hasPagination: false;
    },
): UseDataGridNoPaginationReturnType<TData, TSearchVariables>;
export function useDataGrid<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>({
    onSearch: onSearchProp,
    initialCurrent,
    initialPageSize = 25,
    hasPagination = true,
    initialSorter,
    permanentSorter,
    defaultSetFilterBehavior = "replace",
    initialFilter,
    permanentFilter,
    syncWithLocation: syncWithLocationProp,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName,
}: UseDataGridProps<TData, TError, TSearchVariables> = {}):
    | UseDataGridReturnType<TData, TSearchVariables>
    | UseDataGridNoPaginationReturnType<TData, TSearchVariables> {
    const [columnsTypes, setColumnsType] = useState<Record<string, string>>();

    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        filters,
        setFilters,
        sorter,
        setSorter,
        pageCount,
        createLinkForSyncWithLocation,
    } = useTableCore({
        permanentSorter,
        permanentFilter,
        initialCurrent,
        initialPageSize,
        // @ts-expect-error currently boolean casting is not supported in overloaded types.
        hasPagination: hasPagination,
        initialSorter,
        initialFilter,
        syncWithLocation: syncWithLocationProp,
        defaultSetFilterBehavior,
        resource: resourceFromProp,
        successNotification,
        errorNotification,
        queryOptions,
        liveMode: liveModeFromProp,
        onLiveEvent,
        liveParams,
        metaData,
        dataProviderName,
    });

    const theme = useTheme();

    const { data, isFetched, isLoading } = tableQueryResult;

    const liveMode = useLiveMode(liveModeFromProp);

    const handlePageChange = (page: number) => {
        if (hasPagination) {
            setCurrent(page + 1);
        }
    };
    const handlePageSizeChange = (pageSize: number) => {
        if (hasPagination) {
            setPageSize(pageSize);
        }
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        const crudSorting = transformSortModelToCrudSorting(sortModel);
        setSorter(crudSorting);
    };

    const handleFilterModelChange = (filterModel: GridFilterModel) => {
        const crudFilters = transformFilterModelToCrudFilters(filterModel);
        setFilters(crudFilters);
        if (hasPagination) {
            setCurrent(1);
        }
    };

    const search = async (value: TSearchVariables) => {
        if (onSearchProp) {
            const searchFilters = await onSearchProp(value);
            setFilters(searchFilters);
            if (hasPagination) {
                setCurrent(1);
            }
        }
    };

    const paginationValues = useMemo(() => {
        if (hasPagination) {
            return {
                current,
                setCurrent,
                pageSize,
                setPageSize,
                pageCount,
            };
        }

        return {
            current: undefined,
            setCurrent: undefined,
            pageSize: undefined,
            setPageSize: undefined,
            pageCount: undefined,
        };
    }, [hasPagination, current, pageSize, pageCount]);

    const dataGridPaginationValues = () => {
        if (hasPagination) {
            return {
                paginationMode: "server" as const,
                page: (current ?? 1) - 1,
                onPageChange: handlePageChange,
                pageSize: pageSize,
                onPageSizeChange: handlePageSizeChange,
            };
        }

        return {
            hideFooterPagination: true,
        };
    };

    return {
        tableQueryResult,
        dataGridProps: {
            disableSelectionOnClick: true,
            rows: data?.data || [],
            loading: liveMode === "auto" ? isLoading : !isFetched,
            rowCount: data?.total || 0,
            ...dataGridPaginationValues(),
            sortingMode: "server",
            sortModel: transformCrudSortingToSortModel(
                differenceWith(sorter, permanentSorter ?? [], isEqual),
            ),
            onSortModelChange: handleSortModelChange,
            filterMode: "server",
            filterModel: transformCrudFiltersToFilterModel(
                differenceWith(filters, permanentFilter ?? [], isEqual),
                columnsTypes,
            ),
            onFilterModelChange: handleFilterModelChange,
            onStateChange: (state) => {
                const newColumnsTypes = Object.fromEntries(
                    Object.entries(state.columns.lookup).map(([key, value]) => {
                        return [key, (value as any).type];
                    }),
                );
                const isStateChanged = !isEqual(newColumnsTypes, columnsTypes);

                if (isStateChanged) {
                    setColumnsType(newColumnsTypes);
                }
            },
            sx: {
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                    background: darken(theme.palette.background.paper, 0.05),
                    borderBottom: `1px solid ${darken(
                        theme.palette.background.paper,
                        0.1,
                    )}`,
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${darken(
                        theme.palette.background.paper,
                        0.05,
                    )}`,
                },
            },
        },
        ...paginationValues,
        sorter,
        setSorter,
        filters,
        setFilters,
        search,
        createLinkForSyncWithLocation,
    };
}
