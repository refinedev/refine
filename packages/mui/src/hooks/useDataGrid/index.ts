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
    GridFilterModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material";

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
            | "columns"
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
        >
    >;

export type UseDataGridProps<TData, TError, TSearchVariables = unknown> =
    useTablePropsCore<TData, TError> & {
        columns: DataGridProps["columns"];
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
    columns,
    onSearch: onSearchProp,
    initialCurrent,
    initialPageSize = 25,
    initialSorter,
    permanentSorter,
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
}: UseDataGridProps<TData, TError, TSearchVariables>): UseDataGridReturnType<
    TData,
    TSearchVariables
> => {
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
            columns,
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
            sortModel: transformCrudSortingToSortModel(sorter),
            onSortModelChange: handleSortModelChange,
            filterMode: "server",
            filterModel: transformCrudFiltersToFilterModel(filters, columns),
            onFilterModelChange: handleFilterModelChange,
            sx: {
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                    background:
                        theme.palette.mode === "light" ? "#fafafa" : "#1b1d1e",
                    borderBottom: `1px solid ${
                        theme.palette.mode === "light" ? "#f0f0f0" : "#34393b"
                    }`,
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${
                        theme.palette.mode === "light" ? "#f0f0f0" : "#34393b"
                    }`,
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
