import {
    QueryObserverResult,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";

import {
    BaseRecord,
    BaseKey,
    GetManyResponse,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    SuccessErrorNotification,
} from "../../interfaces";
import {
    useResource,
    useTranslate,
    useCheckError,
    useResourceSubscription,
    useHandleNotification,
    useDataProvider,
} from "@hooks";
import {
    queryKeys,
    pickDataProvider,
    handleMultiple,
} from "@definitions/helpers";

export type UseManyProps<TData, TError> = {
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
    queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    /**
     * Metadata query for `dataProvider`,
     */
    metaData?: MetaDataQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     * @default "default"
     */
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

/**
 * `useMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving multiple items from a `resource`.
 *
 * It uses `getMany` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 *
 */
export const useMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    ids,
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams,
    dataProviderName,
}: UseManyProps<TData, TError>): QueryObserverResult<
    GetManyResponse<TData>
> => {
    const { resources } = useResource();
    const dataProvider = useDataProvider();
    const queryKey = queryKeys(
        resource,
        pickDataProvider(resource, dataProviderName, resources),
        metaData,
    );

    const { getMany, getOne } = dataProvider(
        pickDataProvider(resource, dataProviderName, resources),
    );

    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    useResourceSubscription({
        resource,
        types: ["*"],
        params: {
            ids: ids ?? [],
            metaData,
            subscriptionType: "useMany",
            ...liveParams,
        },
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetManyResponse<TData>, TError>(
        queryKey.many(ids),
        ({ queryKey, pageParam, signal }) => {
            if (getMany) {
                return getMany({
                    resource,
                    ids,
                    metaData: {
                        ...metaData,
                        queryContext: {
                            queryKey,
                            pageParam,
                            signal,
                        },
                    },
                });
            } else {
                return handleMultiple(
                    ids.map((id) =>
                        getOne<TData>({
                            resource,
                            id,
                            metaData: {
                                ...metaData,
                                queryContext: {
                                    queryKey,
                                    pageParam,
                                    signal,
                                },
                            },
                        }),
                    ),
                );
            }
        },
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(data, ids, resource)
                        : successNotification;

                handleNotification(notificationConfig);
            },
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                const notificationConfig =
                    typeof errorNotification === "function"
                        ? errorNotification(err, ids, resource)
                        : errorNotification;

                handleNotification(notificationConfig, {
                    key: `${ids[0]}-${resource}-getMany-notification`,
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
