import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type InfiniteData,
  type InfiniteQueryObserverResult,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

import {
  getNextPageParam,
  getPreviousPageParam,
  handlePaginationParams,
  pickDataProvider,
  pickNotDeprecated,
  prepareQueryContext,
} from "@definitions/helpers";
import {
  useDataProvider,
  useHandleNotification,
  useKeys,
  useMeta,
  useOnError,
  useResource,
  useResourceSubscription,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CrudFilter,
  CrudSort,
  GetListResponse,
  HttpError,
  MetaQuery,
  Pagination,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export interface UseInfiniteListConfig {
  pagination?: Pagination;
  hasPagination?: boolean;
  sort?: CrudSort[];
  filters?: CrudFilter[];
}

type BaseInfiniteListProps = {
  /**
   *  Metadata query for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   *  Metadata query for `dataProvider`
   *  @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * Configuration for pagination, sorting and filtering
   * @type [`useInfiniteListConfig`](/docs/api-reference/core/hooks/data/useInfiniteList/#config-parameters)
   * @deprecated `config` property is deprecated. Use `pagination`, `hasPagination`, `sorters` and `filters` instead.
   */
  config?: UseInfiniteListConfig;
  /**
   * Pagination properties
   */
  pagination?: Pagination;
  /**
   * Whether to use server-side pagination or not
   * @deprecated `hasPagination` property is deprecated. Use `pagination.mode` instead.
   */
  hasPagination?: boolean;
  /**
   * Sorter parameters
   */
  sorters?: CrudSort[];
  /**
   * Filter parameters
   */
  filters?: CrudFilter[];
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use
   */
  dataProviderName?: string;
};

// Custom type to extend UseInfiniteQueryOptions
export type UseInfiniteListQueryOptions<TQueryFnData, TError, TData> = Omit<
  UseInfiniteQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >,
  "queryKey" | "queryFn" | "initialPageParam"
> & {
  // Make queryKey, queryFn, and initialPageParam optional
  queryKey?: UseInfiniteQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >["queryKey"];
  queryFn?: UseInfiniteQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >["queryFn"];
  initialPageParam?: UseInfiniteQueryOptions<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >["initialPageParam"];
};

export type UseInfiniteListProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * Tanstack Query's [useInfiniteQuery](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) options
   */
  queryOptions?: UseInfiniteListQueryOptions<TQueryFnData, TError, TData>;
} & BaseInfiniteListProps &
  SuccessErrorNotification<
    InfiniteData<GetListResponse<TData>>,
    TError,
    Prettify<BaseInfiniteListProps>
  > &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps & {
    onSuccess?: (data: InfiniteData<GetListResponse<TData>>) => void;
    onError?: (error: TError) => void;
  };

/**
 * `useInfiniteList` is a modified version of `react-query`'s {@link https://tanstack.com/query/latest/docs/react/guides/infinite-queries `useInfiniteQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useInfiniteList = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  config,
  filters,
  hasPagination,
  pagination,
  sorters,
  queryOptions,
  successNotification,
  errorNotification,
  meta,
  metaData,
  liveMode,
  onLiveEvent,
  liveParams,
  dataProviderName,
  overtimeOptions,
  onSuccess,
  onError,
}: UseInfiniteListProps<
  TQueryFnData,
  TError,
  TData
>): InfiniteQueryObserverResult<GetListResponse<TData>, TError> &
  UseLoadingOvertimeReturnType => {
  const { resources, resource, identifier } = useResource(resourceFromProp);

  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const pickedDataProvider = pickDataProvider(
    identifier,
    dataProviderName,
    resources,
  );
  const preferredMeta = pickNotDeprecated(meta, metaData);
  const prefferedFilters = pickNotDeprecated(filters, config?.filters);
  const prefferedSorters = pickNotDeprecated(sorters, config?.sort);
  const prefferedHasPagination = pickNotDeprecated(
    hasPagination,
    config?.hasPagination,
  );
  const prefferedPagination = handlePaginationParams({
    pagination,
    configPagination: config?.pagination,
    hasPagination: prefferedHasPagination,
  });
  const isServerPagination = prefferedPagination.mode === "server";
  const notificationValues = {
    meta: preferredMeta,
    metaData: preferredMeta,
    filters: prefferedFilters,
    hasPagination: isServerPagination,
    pagination: prefferedPagination,
    sorters: prefferedSorters,
    config: {
      ...config,
      sort: prefferedSorters,
    },
  };

  const isEnabled =
    queryOptions?.enabled === undefined || queryOptions?.enabled === true;

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  const { getList } = dataProvider(pickedDataProvider);

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    params: {
      meta: combinedMeta,
      metaData: combinedMeta,
      pagination: prefferedPagination,
      hasPagination: isServerPagination,
      sort: prefferedSorters,
      sorters: prefferedSorters,
      filters: prefferedFilters,
      subscriptionType: "useList",
      ...liveParams,
    },
    channel: `resources/${resource.name}`,
    enabled: isEnabled,
    liveMode,
    onLiveEvent,
    dataProviderName: pickedDataProvider,
    meta: {
      ...combinedMeta,
      dataProviderName,
    },
  });

  const queryResponse = useInfiniteQuery<
    GetListResponse<TQueryFnData>,
    TError,
    GetListResponse<TData>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier)
      .action("infinite")
      .params({
        ...(preferredMeta || {}),
        filters: prefferedFilters,
        hasPagination: isServerPagination,
        ...(isServerPagination && {
          pagination: prefferedPagination,
        }),
        ...(sorters && {
          sorters,
        }),
        ...(config?.sort && {
          sort: config?.sort,
        }),
      })
      .get(),
    queryFn: (context) => {
      const paginationProperties = {
        ...prefferedPagination,
        current: context.pageParam,
      };

      const meta = {
        ...combinedMeta,
        queryContext: prepareQueryContext(context),
      };

      return getList<TQueryFnData>({
        resource: resource.name,
        pagination: paginationProperties as any,
        hasPagination: isServerPagination,
        filters: prefferedFilters,
        sort: prefferedSorters,
        sorters: prefferedSorters,
        meta,
        metaData: meta,
      }).then(({ data, total, ...rest }) => {
        return {
          data,
          total,
          pagination: paginationProperties,
          ...rest,
        };
      });
    },
    // v5 requires initialPageParam
    initialPageParam:
      queryOptions?.initialPageParam ?? prefferedPagination.current,
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
    getPreviousPageParam: (lastPage) => getPreviousPageParam(lastPage),
    ...queryOptions,
    meta: {
      ...(queryOptions?.meta ?? {}),
      ...getXRay("useInfiniteList", resource?.name),
    },
  });

  // Handle success
  useEffect(() => {
    if (queryResponse.isSuccess && queryResponse.data) {
      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(
              queryResponse.data as unknown as InfiniteData<
                GetListResponse<TData>
              >,
              notificationValues,
              identifier,
            )
          : successNotification;

      handleNotification(notificationConfig);

      onSuccess?.(
        queryResponse.data as unknown as InfiniteData<GetListResponse<TData>>,
      );
    }
  }, [
    queryResponse.isSuccess,
    queryResponse.data,
    successNotification,
    onSuccess,
  ]);

  // Handle error
  useEffect(() => {
    if (queryResponse.isError && queryResponse.error) {
      checkError(queryResponse.error);

      const notificationConfig =
        typeof errorNotification === "function"
          ? errorNotification(
              queryResponse.error,
              notificationValues,
              identifier,
            )
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${identifier}-useInfiniteList-notification`,
        message: translate(
          "notifications.error",
          { statusCode: queryResponse.error.statusCode },
          `Error (status code: ${queryResponse.error.statusCode})`,
        ),
        description: queryResponse.error.message,
        type: "error",
      });

      onError?.(queryResponse.error);
    }
  }, [queryResponse.isError, queryResponse.error, errorNotification, onError]);

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: queryResponse.isFetching,
  });

  return {
    ...queryResponse,
    // Map v5 isPending to v4 isLoading for backward compatibility
    isLoading: queryResponse.isPending,
    // Map v5 'pending' status to v4 'loading' status
    status:
      queryResponse.status === "pending"
        ? ("loading" as any)
        : queryResponse.status,
    overtime: { elapsedTime },
  } as InfiniteQueryObserverResult<GetListResponse<TData>, TError> &
    UseLoadingOvertimeReturnType;
};
