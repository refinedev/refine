import {
    QueryObserverResult,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";

import {
    GetOneResponse,
    HttpError,
    BaseRecord,
    BaseKey,
    LiveModeProps,
    SuccessErrorNotification,
    MetaQuery,
    Prettify,
} from "../../interfaces";
import {
    useResource,
    useTranslate,
    useResourceSubscription,
    useHandleNotification,
    useDataProvider,
    useOnError,
    useMeta,
} from "@hooks";
import {
    queryKeys,
    pickDataProvider,
    pickNotDeprecated,
    useActiveAuthProvider,
} from "@definitions";

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
    LiveModeProps;

/**
 * `useOne` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving single items from a `resource`.
 *
 * It uses `getOne` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useOne} for more details.
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
    resource,
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
}: UseOneProps<TQueryFnData, TError, TData>): QueryObserverResult<
    GetOneResponse<TData>
> => {
    const { resources } = useResource();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const handleNotification = useHandleNotification();
    const getMeta = useMeta();

    const preferredMeta = pickNotDeprecated(meta, metaData);

    const queryKey = queryKeys(
        resource,
        pickDataProvider(resource, dataProviderName, resources),
        preferredMeta,
        preferredMeta,
    );

    const { getOne } = dataProvider(
        pickDataProvider(resource, dataProviderName, resources),
    );

    const combinedMeta = getMeta({ meta: preferredMeta });

    useResourceSubscription({
        resource,
        types: ["*"],
        channel: `resources/${resource}`,
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
                : typeof resource !== "undefined" && typeof id !== "undefined",
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<
        GetOneResponse<TQueryFnData>,
        TError,
        GetOneResponse<TData>
    >(
        queryKey.detail(id),
        ({ queryKey, pageParam, signal }) =>
            getOne<TQueryFnData>({
                resource: resource!,
                id: id!,
                meta: {
                    ...combinedMeta,
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
                metaData: {
                    ...combinedMeta,
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
            }),
        {
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
                              resource,
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
                              resource,
                          )
                        : errorNotification;

                handleNotification(notificationConfig, {
                    key: `${id}-${resource}-getOne-notification`,
                    message: translate(
                        "notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                    type: "error",
                });
            },
        },
    );

    return queryResponse;
};
