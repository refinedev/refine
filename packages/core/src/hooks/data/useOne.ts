import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import {
  pickDataProvider,
  pickNotDeprecated,
  prepareQueryContext,
  useActiveAuthProvider,
} from "@definitions";
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
  BaseKey,
  BaseRecord,
  GetOneResponse,
  HttpError,
  MetaQuery,
  Prettify,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";

export type UseOneProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource?: string;
  /**
   * id of the item in the resource
   * @type [`BaseKey`](/docs/api-reference/core/interfaceReferences/#basekey)
   */
  id?: BaseKey;
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
   */
  queryOptions?: UseQueryOptions<
    GetOneResponse<TQueryFnData>,
    TError,
    GetOneResponse<TData>
  >;
  /**
   * Metadata query for `dataProvider`,
   */
  meta?: MetaQuery;
  /**
   * Meta data query for `dataProvider`,
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default `"default"``
   */
  dataProviderName?: string;
} & SuccessErrorNotification<
  GetOneResponse<TData>,
  TError,
  Prettify<{ id?: BaseKey } & MetaQuery>
> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

/**
 * `useOne` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving single items from a `resource`.
 *
 * It uses `getOne` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useOne} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useOne = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  id,
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
}: UseOneProps<TQueryFnData, TError, TData>): QueryObserverResult<
  GetOneResponse<TData>,
  TError
> &
  UseLoadingOvertimeReturnType => {
  const { resources, resource, identifier } = useResource(resourceFromProp);

  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const authProvider = useActiveAuthProvider();
  const { mutate: checkError } = useOnError({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys, preferLegacyKeys } = useKeys();

  const preferredMeta = pickNotDeprecated(meta, metaData);
  const pickedDataProvider = pickDataProvider(
    identifier,
    dataProviderName,
    resources,
  );

  const { getOne } = dataProvider(pickedDataProvider);

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    channel: `resources/${resource?.name}`,
    params: {
      ids: id ? [id] : [],
      id: id,
      meta: combinedMeta,
      metaData: combinedMeta,
      subscriptionType: "useOne",
      ...liveParams,
    },
    enabled:
      typeof queryOptions?.enabled !== "undefined"
        ? queryOptions?.enabled
        : typeof resource?.name !== "undefined" && typeof id !== "undefined",
    liveMode,
    onLiveEvent,
    dataProviderName: pickedDataProvider,
    meta: {
      ...meta,
      dataProviderName,
    },
  });

  const queryResponse = useQuery<
    GetOneResponse<TQueryFnData>,
    TError,
    GetOneResponse<TData>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier ?? "")
      .action("one")
      .id(id ?? "")
      .params({
        ...(preferredMeta || {}),
      })
      .get(preferLegacyKeys),
    queryFn: (context) =>
      getOne<TQueryFnData>({
        resource: resource?.name ?? "",
        id: id!,
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
    enabled:
      typeof queryOptions?.enabled !== "undefined"
        ? queryOptions?.enabled
        : typeof id !== "undefined",
    onSuccess: (data) => {
      queryOptions?.onSuccess?.(data);

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(
              data,
              {
                id,
                ...combinedMeta,
              },
              identifier,
            )
          : successNotification;

      handleNotification(notificationConfig);
    },
    onError: (err: TError) => {
      checkError(err);
      queryOptions?.onError?.(err);

      const notificationConfig =
        typeof errorNotification === "function"
          ? errorNotification(
              err,
              {
                id,
                ...combinedMeta,
              },
              identifier,
            )
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${id}-${identifier}-getOne-notification`,
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
      ...getXRay("useOne", preferLegacyKeys, resource?.name),
    },
  });

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: queryResponse.isFetching,
  });

  return { ...queryResponse, overtime: { elapsedTime } };
};
