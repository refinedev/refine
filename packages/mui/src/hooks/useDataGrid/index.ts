import { useState } from "react";
import {
    BaseRecord,
    CrudFilters,
    HttpError,
    useTable as useTableCore,
    useTableProps as useTablePropsCore,
    useTableReturnType as useTableReturnTypeCore,
    useLiveMode,
} from "@pankod/refine-core";
import {
    DataGridProps,
    GridColType,
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

export type ColumnsLookupType = Record<
    string,
    {
        type?: GridColType;
        [key: string]: any;
    }
>;

type DataGridPropsType = Pick<DataGridProps, "filterModel"> &
    Required<
        Pick<
            DataGridProps,
            | "rows"
            | "loading"
            | "paginationMode"
            | "rowCount"
            | "page"
            | "onPageChange"
            | "pageSize"
            | "onPageSizeChange"
            | "sortingMode"
            | "sortModel"
            | "onSortModelChange"
            | "filterMode"
            | "onFilterModelChange"
            | "sx"
            | "disableSelectionOnClick"
            | "onStateChange"
        >
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

export const useDataGrid = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TSearchVariables = unknown,
>({
    onSearch: onSearchProp,
    initialCurrent,
    initialPageSize = 25,
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
}: UseDataGridProps<
    TData,
    TError,
    TSearchVariables
> = {}): UseDataGridReturnType<TData, TSearchVariables> => {
    const [columnsLookup, setColumnsLookup] = useState<ColumnsLookupType>();

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
        setCurrent(page + 1);
    };
    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize);
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        const crudSorting = transformSortModelToCrudSorting(sortModel);
        setSorter(crudSorting);
    };

    const handleFilterModelChange = (filterModel: GridFilterModel) => {
        const crudFilters = transformFilterModelToCrudFilters(filterModel);
        setFilters(crudFilters);
        setCurrent(1);
    };

    const search = async (value: TSearchVariables) => {
        if (onSearchProp) {
            const searchFilters = await onSearchProp(value);
            setFilters(searchFilters);
            setCurrent(1);
        }
    };

    return {
        tableQueryResult,
        dataGridProps: {
            disableSelectionOnClick: true,
            rows: data?.data || [],
            loading: liveMode === "auto" ? isLoading : !isFetched,
            paginationMode: "server",
            rowCount: data?.total || 0,
            page: current - 1,
            onPageChange: handlePageChange,
            pageSize: pageSize,
            onPageSizeChange: handlePageSizeChange,
            sortingMode: "server",
            sortModel: transformCrudSortingToSortModel(
                differenceWith(sorter, permanentSorter ?? [], isEqual),
            ),
            onSortModelChange: handleSortModelChange,
            filterMode: "server",
            filterModel: transformCrudFiltersToFilterModel(
                differenceWith(filters, permanentFilter ?? [], isEqual),
                columnsLookup,
            ),
            onFilterModelChange: handleFilterModelChange,
            onStateChange: (state) => {
                setColumnsLookup(state.columns.lookup);
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
        sorter,
        setSorter,
        filters,
        setFilters,
        search,
        pageCount,
        createLinkForSyncWithLocation,
    };
};
