import { useEffect } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type QueryObserverResult,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

import {
  handleMultiple,
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
  BaseKey,
  BaseRecord,
  GetManyResponse,
  HttpError,
  MetaQuery,
} from "../../contexts/data/types";
import type { LiveModeProps } from "../../contexts/live/types";
import type { SuccessErrorNotification } from "../../contexts/notification/types";
import {
  type UseLoadingOvertimeOptionsProps,
  type UseLoadingOvertimeReturnType,
  useLoadingOvertime,
} from "../useLoadingOvertime";
import warnOnce from "warn-once";

export type UseManyQueryOptions<TQueryFnData, TError, TData> = Omit<
  UseQueryOptions<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >,
  "queryKey" | "queryFn"
> & {
  // Make queryKey and queryFn optional for backward compatibility
  queryKey?: UseQueryOptions<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >["queryKey"];
  queryFn?: UseQueryOptions<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >["queryFn"];
};

export type UseManyProps<TQueryFnData, TError, TData> = {
  /**
   * Resource name for API data interactions
   */
  resource: string;
  /**
   * ids of the item in the resource
   * @type [`BaseKey[]`](/docs/api-reference/core/interfaceReferences/#basekey)
   */
  ids: BaseKey[];
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
   */
  queryOptions?: UseManyQueryOptions<TQueryFnData, TError, TData>;
  /**
   * Metadata query for `dataProvider`,
   */
  meta?: MetaQuery;
  /**
   * Metadata query for `dataProvider`,
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
  /**
   * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
   * @default "default"
   */
  dataProviderName?: string;
  /**
   * Callback to be called when the query is successful
   */
  onSuccess?: (data: GetManyResponse<TData>) => void;
  /**
   * Callback to be called when the query encounters an error
   */
  onError?: (error: TError) => void;
} & SuccessErrorNotification<GetManyResponse<TData>, TError, BaseKey[]> &
  LiveModeProps &
  UseLoadingOvertimeOptionsProps;

/**
 * `useMany` is a modified version of `react-query`'s {@link https://tanstack.com/query/v4/docs/framework/react/guides/queries `useQuery`} used for retrieving multiple items from a `resource`.
 *
 * It uses `getMany` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/data/useMany} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */

export const useMany = <
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
>({
  resource: resourceFromProp,
  ids,
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
}: UseManyProps<TQueryFnData, TError, TData>): QueryObserverResult<
  GetManyResponse<TData>,
  TError
> &
  UseLoadingOvertimeReturnType => {
  const { resources, resource, identifier } = useResource(resourceFromProp);
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const { mutate: checkError } = useOnError();
  const handleNotification = useHandleNotification();
  const getMeta = useMeta();
  const { keys } = useKeys();

  const preferredMeta = pickNotDeprecated(meta, metaData);
  const pickedDataProvider = pickDataProvider(
    identifier,
    dataProviderName,
    resources,
  );
  const isEnabled =
    queryOptions?.enabled === undefined || queryOptions?.enabled === true;

  const { getMany, getOne } = dataProvider(pickedDataProvider);

  const combinedMeta = getMeta({ resource, meta: preferredMeta });

  const hasIds = Array.isArray(ids);
  const hasResource = Boolean(resource?.name);
  const manuallyEnabled = queryOptions?.enabled === true;

  warnOnce(!hasIds && !manuallyEnabled, idsWarningMessage(ids, resource?.name));
  warnOnce(!hasResource && !manuallyEnabled, resourceWarningMessage());

  useResourceSubscription({
    resource: identifier,
    types: ["*"],
    params: {
      ids: ids ?? [],
      meta: combinedMeta,
      metaData: combinedMeta,
      subscriptionType: "useMany",
      ...liveParams,
    },
    channel: `resources/${resource?.name ?? ""}`,
    enabled: isEnabled,
    liveMode,
    onLiveEvent,
    dataProviderName: pickedDataProvider,
    meta: {
      ...meta,
      dataProviderName,
    },
  });

  const queryResponse = useQuery<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >({
    queryKey: keys()
      .data(pickedDataProvider)
      .resource(identifier)
      .action("many")
      .ids(...(ids ?? []))
      .params({
        ...(preferredMeta || {}),
      })
      .get(),
    queryFn: (context) => {
      const meta = {
        ...combinedMeta,
        queryContext: prepareQueryContext(context as any),
      };

      if (getMany) {
        return getMany({
          resource: resource?.name,
          ids,
          meta,
          metaData: meta,
        });
      }
      return handleMultiple(
        ids.map((id) =>
          getOne<TQueryFnData>({
            resource: resource?.name,
            id,
            meta,
            metaData: meta,
          }),
        ),
      );
    },
    enabled: hasIds && hasResource,
    ...queryOptions,
    meta: {
      ...queryOptions?.meta,
      ...getXRay("useMany", resource?.name),
    },
  });

  // Handle success
  useEffect(() => {
    if (queryResponse.isSuccess && queryResponse.data) {
      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(queryResponse.data, ids, identifier)
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
          ? errorNotification(queryResponse.error, ids, identifier)
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${ids[0]}-${identifier}-getMany-notification`,
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
      queryResponse.status === "pending" ? "loading" : queryResponse.status,
    overtime: { elapsedTime },
  } as QueryObserverResult<GetManyResponse<TData>, TError> &
    UseLoadingOvertimeReturnType;
};

const idsWarningMessage = (
  ids: BaseKey[],
  resource: string,
) => `[useMany]: Missing "ids" prop. Expected an array of ids, but got "${typeof ids}". Resource: "${resource}"

See https://refine.dev/docs/data/hooks/use-many/#ids-`;

const resourceWarningMessage = () => `[useMany]: Missing "resource" prop. Expected a string, but got undefined.

See https://refine.dev/docs/data/hooks/use-many/#resource-`;
