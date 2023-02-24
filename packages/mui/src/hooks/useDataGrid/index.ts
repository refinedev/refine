import { useState } from "react";
import {
    BaseRecord,
    CrudFilters,
    HttpError,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType as useTableReturnTypeCore,
    useLiveMode,
    pickNotDeprecated,
    Pagination,
    Prettify,
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

type DataGridPropsType = Required<
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
        | "paginationMode"
    >
> &
    Pick<
        DataGridProps,
        | "page"
        | "onPageChange"
        | "pageSize"
        | "onPageSizeChange"
        | "filterModel"
    >;

export type UseDataGridProps<TData, TError, TSearchVariables = unknown> = Omit<
    useTablePropsCore<TData, TError>,
    "pagination"
> & {
    onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
    pagination?: Prettify<
        Omit<Pagination, "pageSize"> & {
            /**
             * Initial number of items per page
             * @default 25
             */
            pageSize?: number;
        }
    >;
};

export type UseDataGridReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
> = useTableReturnTypeCore<TData, TError> & {
    dataGridProps: DataGridPropsType;
    search: (value: TSearchVariables) => Promise<void>;
};

export function useDataGrid<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>({
    onSearch: onSearchProp,
    initialCurrent,
    initialPageSize = 25,
    pagination,
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
    meta,
    metaData,
    dataProviderName,
}: UseDataGridProps<
    TData,
    TError,
    TSearchVariables
> = {}): UseDataGridReturnType<TData, TError, TSearchVariables> {
    const theme = useTheme();
    const liveMode = useLiveMode(liveModeFromProp);

    const [columnsTypes, setColumnsType] = useState<Record<string, string>>();

    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        filters,
        setFilters,
        sorters,
        setSorters,
        sorter,
        setSorter,
        pageCount,
        createLinkForSyncWithLocation,
    } = useTableCore<TData, TError>({
        permanentSorter,
        permanentFilter,
        initialCurrent,
        initialPageSize,
        pagination,
        hasPagination,
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
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        dataProviderName,
    });

    const [muiCrudFilters, setMuiCrudFilters] = useState<CrudFilters>(filters);

    const { data, isFetched, isLoading } = tableQueryResult;

    const hasPaginationString = hasPagination === false ? "off" : "server";
    const isPaginationEnabled =
        (pagination?.mode ?? hasPaginationString) !== "off";

    const handlePageChange = (page: number) => {
        if (isPaginationEnabled) {
            setCurrent(page + 1);
        }
    };
    const handlePageSizeChange = (pageSize: number) => {
        if (isPaginationEnabled) {
            setPageSize(pageSize);
        }
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        const crudSorting = transformSortModelToCrudSorting(sortModel);
        setSorters(crudSorting);
    };

    const handleFilterModelChange = (filterModel: GridFilterModel) => {
        const crudFilters = transformFilterModelToCrudFilters(filterModel);
        setMuiCrudFilters(crudFilters);
        setFilters(crudFilters.filter((f) => f.value !== ""));
        if (isPaginationEnabled) {
            setCurrent(1);
        }
    };

    const search = async (value: TSearchVariables) => {
        if (onSearchProp) {
            const searchFilters = await onSearchProp(value);
            setMuiCrudFilters(searchFilters);
            setFilters(searchFilters.filter((f) => f.value !== ""));
            if (isPaginationEnabled) {
                setCurrent(1);
            }
        }
    };

    const dataGridPaginationValues = () => {
        if (isPaginationEnabled) {
            return {
                paginationMode: "server" as const,
                page: current - 1,
                onPageChange: handlePageChange,
                pageSize,
                onPageSizeChange: handlePageSizeChange,
            };
        }

        return {
            paginationMode: "client" as const,
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
                differenceWith(sorters, permanentSorter ?? [], isEqual),
            ),
            onSortModelChange: handleSortModelChange,
            filterMode: "server",
            filterModel: transformCrudFiltersToFilterModel(
                differenceWith(muiCrudFilters, permanentFilter ?? [], isEqual),
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
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
        sorters,
        setSorters,
        sorter,
        setSorter,
        filters,
        setFilters,
        search,
        createLinkForSyncWithLocation,
    };
}
