import {
  type BaseRecord,
  type CrudFilters,
  type HttpError,
  type Pagination,
  pickNotDeprecated,
  type Prettify,
  useLiveMode,
  useTable as useTableCore,
  type useTableProps as useTablePropsCore,
  type useTableReturnType as useTableReturnTypeCore,
} from "@refinedev/core";
import { useState } from "react";

import type {
  DataGridProps,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";

import { darken, useTheme } from "@mui/material/styles";

import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

import {
  transformCrudFiltersToFilterModel,
  transformCrudSortingToSortModel,
  transformFilterModelToCrudFilters,
  transformSortModelToCrudSorting,
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
    | "disableRowSelectionOnClick"
    | "onStateChange"
    | "paginationMode"
  >
> &
  Pick<
    DataGridProps,
    "paginationModel" | "onPaginationModelChange" | "filterModel"
  >;

export type UseDataGridProps<TQueryFnData, TError, TSearchVariables, TData> =
  Omit<
    useTablePropsCore<TQueryFnData, TError, TData>,
    "pagination" | "filters"
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
    filters?: Prettify<
      Omit<
        NonNullable<useTablePropsCore<TQueryFnData, TError, TData>["filters"]>,
        "defaultBehavior"
      > & {
        /**
         * Default behavior of the `setFilters` function
         * @default "replace"
         */
        defaultBehavior?: "replace" | "merge";
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

/**
 * By using useDataGrid, you are able to get properties that are compatible with
 * Material UI {@link https://mui.com/x/react-data-grid/ `<DataGrid>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TSearchVariables - Values for search params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export function useDataGrid<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
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
  filters: filtersFromProp,
  sorters: sortersFromProp,
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
  overtimeOptions,
}: UseDataGridProps<
  TQueryFnData,
  TError,
  TSearchVariables,
  TData
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
    overtime,
  } = useTableCore<TQueryFnData, TError, TData>({
    permanentSorter,
    permanentFilter,
    initialCurrent,
    initialPageSize,
    pagination,
    hasPagination,
    initialSorter,
    initialFilter,
    filters: filtersFromProp,
    sorters: sortersFromProp,
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
    overtimeOptions,
  });

  const [muiCrudFilters, setMuiCrudFilters] = useState<CrudFilters>(filters);

  const { data, isFetched, isLoading } = tableQueryResult;

  const isServerSideFilteringEnabled =
    (filtersFromProp?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (sortersFromProp?.mode || "server") === "server";
  const hasPaginationString = hasPagination === false ? "off" : "server";
  const isPaginationEnabled =
    (pagination?.mode ?? hasPaginationString) !== "off";

  const preferredPermanentSorters =
    pickNotDeprecated(sortersFromProp?.permanent, permanentSorter) ?? [];
  const preferredPermanentFilters =
    pickNotDeprecated(filtersFromProp?.permanent, permanentFilter) ?? [];

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

  const dataGridPaginationValues = (): Pick<
    DataGridProps,
    "paginationModel" | "onPaginationModelChange"
  > &
    Required<Pick<DataGridProps, "paginationMode">> => {
    if (isPaginationEnabled) {
      return {
        paginationMode: "server" as const,
        paginationModel: {
          page: current - 1,
          pageSize,
        },
        onPaginationModelChange: (model) => {
          handlePageChange(model.page);
          handlePageSizeChange(model.pageSize);
        },
      };
    }

    return {
      paginationMode: "client" as const,
    };
  };

  return {
    tableQueryResult,
    dataGridProps: {
      disableRowSelectionOnClick: true,
      rows: data?.data || [],
      loading: liveMode === "auto" ? isLoading : !isFetched,
      rowCount: data?.total || 0,
      ...dataGridPaginationValues(),
      sortingMode: isServerSideSortingEnabled ? "server" : "client",
      sortModel: transformCrudSortingToSortModel(
        differenceWith(sorters, preferredPermanentSorters, isEqual),
      ),
      onSortModelChange: handleSortModelChange,
      filterMode: isServerSideFilteringEnabled ? "server" : "client",
      filterModel: transformCrudFiltersToFilterModel(
        differenceWith(muiCrudFilters, preferredPermanentFilters, isEqual),
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
    overtime,
  };
}
