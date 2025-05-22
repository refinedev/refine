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
  useActiveAuthProvider,
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
  queryOptions?: UseQueryOptions<
    GetManyResponse<TQueryFnData>,
    TError,
    GetManyResponse<TData>
  >;
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
}: UseManyProps<TQueryFnData, TError, TData>): QueryObserverResult<
  GetManyResponse<TData>,
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
      .get(preferLegacyKeys),
    queryFn: (context) => {
      const meta = {
        ...combinedMeta,
        queryContext: prepareQueryContext(context),
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
    onSuccess: (data) => {
      queryOptions?.onSuccess?.(data);

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(data, ids, identifier)
          : successNotification;

      handleNotification(notificationConfig);
    },
    onError: (err: TError) => {
      checkError(err);
      queryOptions?.onError?.(err);

      const notificationConfig =
        typeof errorNotification === "function"
          ? errorNotification(err, ids, identifier)
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${ids[0]}-${identifier}-getMany-notification`,
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
      ...getXRay("useMany", preferLegacyKeys, resource?.name),
    },
  });

  const { elapsedTime } = useLoadingOvertime({
    ...overtimeOptions,
    isLoading: queryResponse.isFetching,
  });

  return { ...queryResponse, overtime: { elapsedTime } };
};

const idsWarningMessage = (
  ids: BaseKey[],
  resource: string,
) => `[useMany]: Missing "ids" prop. Expected an array of ids, but got "${typeof ids}". Resource: "${resource}"

See https://refine.dev/docs/data/hooks/use-many/#ids-`;

const resourceWarningMessage = () => `[useMany]: Missing "resource" prop. Expected a string, but got undefined.

See https://refine.dev/docs/data/hooks/use-many/#resource-`;
