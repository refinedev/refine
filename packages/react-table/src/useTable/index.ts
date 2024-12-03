import { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import {
  type BaseRecord,
  ConditionalFilter,
  type CrudFilter,
  CrudOperators,
  type CrudSorting,
  type HttpError,
  LogicalFilter,
  useTable as useTableCore,
  type useTableProps as useTablePropsCore,
  type useTableReturnType as useTableReturnTypeCore,
} from "@refinedev/core";
import {
  useReactTable,
  type TableOptions,
  type Table,
  getCoreRowModel,
  ColumnFilter,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  useIsFirstRender,
  columnFiltersToCrudFilters,
  getRemovedFilters,
  crudFiltersToColumnFilters,
} from "../utils";

export type UseTableReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> = Table<TData> & {
  refineCore: useTableReturnTypeCore<TData, TError>;
};

export type UseTableProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = {
  /**
   * Configuration object for the core of the [useTable](/docs/api-reference/core/hooks/useTable/)
   * @type [`useTablePropsCore<TQueryFnData, TError>`](/docs/api-reference/core/hooks/useTable/#properties)
   */
  refineCoreProps?: useTablePropsCore<TQueryFnData, TError, TData>;
} & Pick<TableOptions<TData>, "columns"> &
  Partial<Omit<TableOptions<TData>, "columns">>;

export function useTable<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  refineCoreProps: { hasPagination = true, ...refineCoreProps } = {},
  initialState: reactTableInitialState = {},
  ...rest
}: UseTableProps<TQueryFnData, TError, TData>): UseTableReturnType<
  TData,
  TError
> {
  const isFirstRender = useIsFirstRender();

  const useTableResult = useTableCore<TQueryFnData, TError, TData>({
    ...refineCoreProps,
    hasPagination,
  });

  const isServerSideFilteringEnabled =
    (refineCoreProps.filters?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (refineCoreProps.sorters?.mode || "server") === "server";
  const hasPaginationString = hasPagination === false ? "off" : "server";
  const isPaginationEnabled =
    (refineCoreProps.pagination?.mode ?? hasPaginationString) !== "off";

  const {
    tableQuery: { data },
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

  const reactTableResult = useReactTable<TData>({
    data: data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isServerSideSortingEnabled
      ? undefined
      : getSortedRowModel(),
    getFilteredRowModel: isServerSideFilteringEnabled
      ? undefined
      : getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: current - 1,
        pageSize: pageSizeCore,
      },
      sorting: sorters.map((sorting) => ({
        id: sorting.field,
        desc: sorting.order === "desc",
      })),
      columnFilters: crudFiltersToColumnFilters({
        columns: rest.columns,
        crudFilters: filtersCore,
      }),
      ...reactTableInitialState,
    },
    pageCount,
    manualPagination: true,
    manualSorting: isServerSideSortingEnabled,
    manualFiltering: isServerSideFilteringEnabled,
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
      const newSorters: CrudSorting = sorting.map((sorting) => ({
        field: sorting.id,
        order: sorting.desc ? "desc" : "asc",
      }));

      if (!isEqual(sorters, newSorters)) {
        setSorters(newSorters);
      }

      if (sorting.length > 0 && isPaginationEnabled && !isFirstRender) {
        setCurrent(1);
      }
    }
  }, [sorting]);

  useEffect(() => {
    const crudFilters: CrudFilter[] = columnFiltersToCrudFilters({
      columns,
      columnFilters,
    });

    crudFilters.push(
      ...getRemovedFilters({
        nextFilters: crudFilters,
        coreFilters: filtersCore,
      }),
    );

    if (!isEqual(crudFilters, filtersCore)) {
      setFilters(crudFilters);
    }

    if (crudFilters.length > 0 && isPaginationEnabled && !isFirstRender) {
      setCurrent(1);
    }
  }, [columnFilters, columns]);

  return {
    ...reactTableResult,
    refineCore: useTableResult,
  };
}
