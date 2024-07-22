import { Children, createElement, Fragment } from "react";
import { type ListProps, type FormProps, Form, Grid } from "antd";

import {
  type BaseRecord,
  type CrudFilters,
  type HttpError,
  useTable as useTableCore,
  type useTableProps as useTablePropsCore,
  type useTableReturnType,
  pickNotDeprecated,
} from "@refinedev/core";
import { useLiveMode } from "@refinedev/core";
import { PaginationLink } from "@hooks/table/useTable/paginationLink";
import type { PaginationConfig } from "antd/lib/pagination";

export type useSimpleListProps<TQueryFnData, TError, TSearchVariables, TData> =
  useTablePropsCore<TQueryFnData, TError, TData> & {
    onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
  };

export type useSimpleListReturnType<
  TQueryFnData extends BaseRecord = BaseRecord,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
> = Omit<useTableReturnType<TData>, "tableQueryResult" | "tableQuery"> & {
  listProps: ListProps<TData>;
  /**
   * @deprecated Use `query` instead
   */
  queryResult: useTableReturnType["tableQueryResult"];
  query: useTableReturnType["tableQuery"];
  searchFormProps: FormProps<TSearchVariables>;
};

/**
 * By using `useSimpleList` you get props for your records from API in accordance with Ant Design {@link https://ant.design/components/list/ `<List>`} component.
 * All features such as pagination, sorting come out of the box.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/hooks/list/useSimpleList} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TSearchVariables - Antd form values
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useSimpleList = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  resource,
  initialCurrent,
  initialPageSize,
  pagination,
  hasPagination = true,
  initialSorter,
  permanentSorter,
  initialFilter,
  permanentFilter,
  defaultSetFilterBehavior,
  filters: filtersFromProp,
  sorters: sortersFromProp,
  onSearch,
  queryOptions,
  syncWithLocation,
  successNotification,
  errorNotification,
  liveMode: liveModeFromProp,
  onLiveEvent,
  liveParams,
  meta,
  metaData,
  dataProviderName,
}: useSimpleListProps<
  TQueryFnData,
  TError,
  TSearchVariables,
  TData
> = {}): useSimpleListReturnType<TData, TSearchVariables> => {
  const {
    sorters,
    sorter,
    filters,
    current,
    pageSize,
    pageCount,
    setFilters,
    setCurrent,
    setPageSize,
    setSorter,
    setSorters,
    createLinkForSyncWithLocation,
    tableQueryResult: queryResult,
    tableQuery: query,
    overtime,
  } = useTableCore({
    resource,
    initialSorter,
    permanentSorter,
    initialFilter,
    permanentFilter,
    filters: filtersFromProp,
    sorters: sortersFromProp,
    defaultSetFilterBehavior,
    initialCurrent,
    initialPageSize,
    queryOptions,
    successNotification,
    errorNotification,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    meta: pickNotDeprecated(meta, metaData),
    metaData: pickNotDeprecated(meta, metaData),
    syncWithLocation,
    dataProviderName,
    pagination,
    hasPagination,
  });

  const hasPaginationString = hasPagination === false ? "off" : "server";
  const isPaginationEnabled =
    (pagination?.mode ?? hasPaginationString) !== "off";

  const breakpoint = Grid.useBreakpoint();

  const liveMode = useLiveMode(liveModeFromProp);

  const [form] = Form.useForm<TSearchVariables>();

  const { data, isFetched, isLoading } = queryResult;

  const onChange = (page: number, pageSize?: number): void => {
    if (isPaginationEnabled) {
      setCurrent(page);
      setPageSize(pageSize || 10);
    }
  };

  const onFinish = async (values: TSearchVariables) => {
    if (onSearch) {
      const searchFilters = await onSearch(values);
      if (isPaginationEnabled) {
        setCurrent?.(1);
      }
      return setFilters(searchFilters);
    }
  };

  const antdPagination = (): false | PaginationConfig => {
    if (isPaginationEnabled) {
      return {
        itemRender: (page, type, element) => {
          const link = createLinkForSyncWithLocation({
            pagination: {
              pageSize,
              current: page,
            },
            sorters,
            filters,
          });

          if (type === "page") {
            return createElement(PaginationLink, {
              to: link,
              element: `${page}`,
            });
          }
          if (type === "next" || type === "prev") {
            return createElement(PaginationLink, {
              to: link,
              element: element,
            });
          }

          if (type === "jump-next" || type === "jump-prev") {
            const elementChildren = (element as React.ReactElement)?.props
              ?.children;

            return createElement(PaginationLink, {
              to: link,
              element:
                Children.count(elementChildren) > 1
                  ? createElement(Fragment, {}, elementChildren)
                  : elementChildren,
            });
          }

          return element;
        },
        pageSize,
        current,
        simple: !breakpoint.sm,
        total: data?.total,
        onChange,
      };
    }

    return false;
  };

  return {
    searchFormProps: {
      form,
      onFinish,
    },
    listProps: {
      dataSource: data?.data,
      loading: liveMode === "auto" ? isLoading : !isFetched,
      pagination: antdPagination(),
    },
    query,
    queryResult,
    filters,
    setFilters,
    sorter,
    setSorter,
    sorters,
    setSorters,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    pageCount,
    createLinkForSyncWithLocation,
    overtime,
  };
};
