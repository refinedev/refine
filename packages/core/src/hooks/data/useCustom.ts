import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import { pickNotDeprecated, prepareQueryContext } from "@definitions/helpers";
import {
  useDataProvider,
  useHandleNotification,
  useKeys,
  useMeta,
  useOnError,
  useTranslate,
} from "@hooks";

import type {
  BaseRecord,
  CrudFilter,
  CrudSort,
  CustomResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

interface UseCustomConfig<TQuery, TPayload> {
  /**
   * @deprecated `sort` is deprecated, use `sorters` instead.
   */
  sort?: CrudSort[];
  sorters?: CrudSort[];
  filters?: CrudFilter[];
  query?: TQuery;
  payload?: TPayload;
  headers?: {};
}

// Clean type without custom callback extensions
export type UseCustomQueryOptions<TQueryFnData, TError, TData> = Omit<
  UseQueryOptions<CustomResponse<TQueryFnData>, TError, CustomResponse<TData>>,
  "queryKey" | "queryFn"
> & {
  // Make queryKey and queryFn optional for backward compatibility
  queryKey?: UseQueryOptions<
    CustomResponse<TQueryFnData>,
    TError,
    CustomResponse<TData>
  >["queryKey"];
  queryFn?: UseQueryOptions<
    CustomResponse<TQueryFnData>,
    TError,
    CustomResponse<TData>
  >["queryFn"];
};

export type UseCustomProps<TQueryFnData, TError, TQuery, TPayload, TData> = {
  /**
   * request's URL
   */
  url: string;
  /**
   * request's method (`GET`, `POST`, etc.)
   */
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
  /**
   * The config of your request. You can send headers, payload, query, filters and sorters using this field
   */
  config?: UseCustomConfig<TQuery, TPayload>;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
   */
  queryOptions?: UseCustomQueryOptions<TQueryFnData, TError, TData>;
  /**
   * meta data for `dataProvider`
   */
  meta?: MetaQuery;
  /**
   * meta data for `dataProvider`
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   */
  dataProviderName?: string;
  /**
   * Callback to be called when the query is successful
   */
  onSuccess?: (data: CustomResponse<TData>) => void;
  /**
   * Callback to be called when the query encounters an error
   */
  onError?: (error: TError) => void;
} & SuccessErrorNotification<
  CustomResponse<TData>,
  TError,
  Prettify<UseCustomConfig<TQuery, TPayload> & MetaQuery>
> &
  UseLoadingOvertimeOptionsProps;

/**
 * `useCustom` is a modified version of `react-query`'s {@link https://tanstack.com/query/v4/docs/framework/react/guides/queries `useQuery`} used for custom requests.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useCustom} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TQuery - Values for query params
 * @typeParam TPayload - Values for params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useCustom = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TQuery = unknown,
  TPayload = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  url,
  method,
  config,
  queryOptions,
  successNotification,
  errorNotification,
  meta,
  metaData,
  dataProviderName,
  overtimeOptions,
  onSuccess,
  onError,
}: UseCustomProps<
  TQueryFnData,
  TError,
  TQuery,
  TPayload,
  TData
>): QueryObserverResult<CustomResponse<TData>, TError> &
  UseLoadingOvertimeReturnType => {
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const preferredMeta = pickNotDeprecated(meta, metaData);

  const { custom } = dataProvider(dataProviderName);

  const combinedMeta = getMeta({ meta: preferredMeta });

  if (custom) {
    const queryResponse = useQuery<
      CustomResponse<TQueryFnData>,
      TError,
      CustomResponse<TData>
    >({
      queryKey: keys()
        .data(dataProviderName)
        .mutation("custom")
        .params({
          method,
          url,
          ...config,
          ...(preferredMeta || {}),
        })
        .get(),
      queryFn: (context) =>
        custom<TQueryFnData>({
          url,
          method,
          ...config,
          meta: {
            ...combinedMeta,
            queryContext: prepareQueryContext(context as any),
          },
          metaData: {
            ...combinedMeta,
            queryContext: prepareQueryContext(context as any),
          },
        }),
      ...queryOptions,
      meta: {
        ...queryOptions?.meta,
        ...getXRay("useCustom"),
      },
    });

    // Handle success
    useEffect(() => {
      if (queryResponse.isSuccess && queryResponse.data) {
        const notificationConfig =
          typeof successNotification === "function"
            ? successNotification(queryResponse.data, {
                ...config,
                ...combinedMeta,
              })
            : successNotification;

        handleNotification(notificationConfig);

        onSuccess?.(queryResponse.data);
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
            ? errorNotification(queryResponse.error, {
                ...config,
                ...combinedMeta,
              })
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${method}-notification`,
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
    }, [
      queryResponse.isError,
      queryResponse.error,
      errorNotification,
      onError,
    ]);
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
        queryResponse.status === "pending" ? "loading" : queryResponse.status,
      overtime: { elapsedTime },
    } as QueryObserverResult<CustomResponse<TData>, TError> &
      UseLoadingOvertimeReturnType;
  }
  throw Error("Not implemented custom on data provider.");
};
