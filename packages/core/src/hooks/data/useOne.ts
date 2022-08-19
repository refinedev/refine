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
    MetaDataQuery,
    LiveModeProps,
    SuccessErrorNotification,
} from "../../interfaces";
import {
    useCheckError,
    useTranslate,
    useResourceSubscription,
    useHandleNotification,
    useDataProvider,
} from "@hooks";
import { queryKeys } from "@definitions";

export type UseOneProps<TData, TError> = {
    resource: string;
    id: BaseKey;
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

/**
 * `useOne` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving single items from a `resource`.
 *
 * It uses `getOne` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useOne} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 *
 */
export const useOne = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    id,
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams,
    dataProviderName,
}: UseOneProps<TData, TError>): QueryObserverResult<GetOneResponse<TData>> => {
    const dataProvider = useDataProvider();
    const queryKey = queryKeys(resource, dataProviderName, metaData);

    const { getOne } = dataProvider(dataProviderName);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    useResourceSubscription({
        resource,
        types: ["*"],
        channel: `resources/${resource}`,
        params: {
            ids: id ? [id] : [],
            id: id,
            metaData,
            subscriptionType: "useOne",
            ...liveParams,
        },
        enabled: queryOptions?.enabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetOneResponse<TData>, TError>(
        queryKey.detail(id),
        ({ queryKey, pageParam, signal }) =>
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
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(data, { id, metaData }, resource)
                        : successNotification;

                handleNotification(notificationConfig);
            },
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                const notificationConfig =
                    typeof errorNotification === "function"
                        ? errorNotification(err, { id, metaData }, resource)
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
