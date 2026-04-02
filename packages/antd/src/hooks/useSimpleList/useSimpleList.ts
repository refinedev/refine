import { Children, createElement, Fragment, useMemo } from "react";
import {
  type ListProps,
  type FormProps,
  Form,
  Grid,
  Button,
  Space,
} from "antd";

import {
  type BaseRecord,
  type CrudFilters,
  type HttpError,
  useTable as useTableCore,
  type useTableProps as useTablePropsCore,
  type useTableReturnType,
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
> = Omit<useTableReturnType<TData>, "tableQuery"> & {
  listProps: ListProps<TData>;
  query: useTableReturnType<TData>["tableQuery"];
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
  pagination: paginationFromProp,

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
  dataProviderName,
}: useSimpleListProps<
  TQueryFnData,
  TError,
  TSearchVariables,
  TData
> = {}): useSimpleListReturnType<TData, TSearchVariables> => {
  const {
    sorters,
    filters,
    currentPage,
    pageSize,
    pageCount,
    setFilters,
    setCurrentPage,
    setPageSize,
    setSorters,
    createLinkForSyncWithLocation,
    tableQuery,
    overtime,
    result,
    cursor,
  } = useTableCore({
    resource,
    pagination: paginationFromProp,
    filters: filtersFromProp,
    sorters: sortersFromProp,
    queryOptions,
    successNotification,
    errorNotification,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    meta,
    syncWithLocation,
    dataProviderName,
  });

  const isPaginationEnabled = paginationFromProp?.mode !== "off";
  const isCursorPaginationEnabled = paginationFromProp?.mode === "cursor";

  const breakpoint = Grid.useBreakpoint();

  const liveMode = useLiveMode(liveModeFromProp);

  const [form] = Form.useForm<TSearchVariables>();

  const { data, isFetched, isLoading } = tableQuery;

  const onChange = (page: number, pageSize?: number): void => {
    if (isPaginationEnabled && !isCursorPaginationEnabled) {
      setCurrentPage(page);
      setPageSize(pageSize || 10);
    }
  };

  const onFinish = async (values: TSearchVariables) => {
    if (onSearch) {
      const searchFilters = await onSearch(values);
      if (isPaginationEnabled && !isCursorPaginationEnabled) {
        setCurrentPage?.(1);
      }
      return setFilters(searchFilters);
    }
  };

  const cursorPaginationFooter = useMemo(() => {
    if (!isCursorPaginationEnabled) {
      return undefined;
    }

    return createElement(
      Space,
      {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        },
      },
      createElement(
        Button,
        {
          size: "small",
          disabled: !cursor.hasPreviousPage,
          onClick: cursor.goToPreviousPage,
        },
        "Previous",
      ),
      createElement(
        Button,
        {
          size: "small",
          disabled: !cursor.hasNextPage,
          onClick: cursor.goToNextPage,
        },
        "Next",
      ),
    );
  }, [
    isCursorPaginationEnabled,
    cursor.hasPreviousPage,
    cursor.hasNextPage,
    cursor.goToPreviousPage,
    cursor.goToNextPage,
  ]);

  const antdPagination = useMemo((): false | PaginationConfig => {
    if (!isPaginationEnabled || isCursorPaginationEnabled) {
      return false;
    }

    return {
      itemRender: (page, type, element) => {
        const link = createLinkForSyncWithLocation({
          pagination: {
            pageSize,
            currentPage: page,
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
          const elementChildren = (element as React.ReactElement<any>)?.props
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
      current: currentPage,
      simple: !breakpoint.sm,
      total: data?.total,
      onChange,
    };
  }, [
    isPaginationEnabled,
    isCursorPaginationEnabled,
    pageSize,
    currentPage,
    breakpoint.sm,
    data?.total,
    createLinkForSyncWithLocation,
    sorters,
    filters,
  ]);

  return {
    searchFormProps: {
      form,
      onFinish,
    },
    listProps: {
      dataSource: data?.data,
      loading: liveMode === "auto" ? isLoading : !isFetched,
      pagination: antdPagination,
      ...(cursorPaginationFooter && { footer: cursorPaginationFooter }),
    },
    query: tableQuery,
    filters,
    setFilters,
    sorters,
    setSorters,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageCount,
    createLinkForSyncWithLocation,
    overtime,
    result,
    cursor,
  };
};
