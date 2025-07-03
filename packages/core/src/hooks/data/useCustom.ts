import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import {
  pickNotDeprecated,
  useActiveAuthProvider,
  prepareQueryContext,
} from "@definitions/helpers";
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
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options"
   */
  queryOptions?: UseQueryOptions<
    CustomResponse<TQueryFnData>,
    TError,
    CustomResponse<TData>
  >;
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
}: UseCustomProps<
  TQueryFnData,
  TError,
  TQuery,
  TPayload,
  TData
>): QueryObserverResult<CustomResponse<TData>, TError> &
  UseLoadingOvertimeReturnType => {
  const dataProvider = useDataProvider();
  const authProvider = useActiveAuthProvider();
  const { mutate: checkError } = useOnError({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const translate = useTranslate();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys, preferLegacyKeys } = useKeys();

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
        .get(preferLegacyKeys),
      queryFn: (context) =>
        custom<TQueryFnData>({
          url,
          method,
          ...config,
          meta: {
            ...combinedMeta,
            queryContext: prepareQueryContext(context),
          },
          metaData: {
            ...combinedMeta,
            queryContext: prepareQueryContext(context),
          },
        }),
      ...queryOptions,
      onSuccess: (data) => {
        queryOptions?.onSuccess?.(data);

        const notificationConfig =
          typeof successNotification === "function"
            ? successNotification(data, {
                ...config,
                ...combinedMeta,
              })
            : successNotification;

        handleNotification(notificationConfig);
      },
      onError: (err: TError) => {
        checkError(err);
        queryOptions?.onError?.(err);

        const notificationConfig =
          typeof errorNotification === "function"
            ? errorNotification(err, {
                ...config,
                ...combinedMeta,
              })
            : errorNotification;

        handleNotification(notificationConfig, {
          key: `${method}-notification`,
          message: translate(
            "notifications.error",
            { statusCode: err.statusCode },
            `Error (status code: ${err.statusCode})`,
          ),
          description: err.message,
          type: "error",
        });
      },
      meta: {
        ...queryOptions?.meta,
        ...getXRay("useCustom", preferLegacyKeys),
      },
    });
    const { elapsedTime } = useLoadingOvertime({
      ...overtimeOptions,
      isLoading: queryResponse.isFetching,
    });

    return { ...queryResponse, overtime: { elapsedTime } };
  }
  throw Error("Not implemented custom on data provider.");
};
