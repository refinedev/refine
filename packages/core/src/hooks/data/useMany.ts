import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import {
    BaseRecord,
    BaseKey,
    GetManyResponse,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    OpenNotificationParams,
} from "../../interfaces";
import {
    useTranslate,
    useCheckError,
    useResourceSubscription,
    useHandleNotification,
    useDataProvider,
} from "@hooks";

export type UseManyProps<TData, TError> = {
    resource: string;
    ids: BaseKey[];
    queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    successNotification?: OpenNotificationParams | false;
    errorNotification?: OpenNotificationParams | false;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & LiveModeProps;

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
    const dataProvider = useDataProvider();

    const { getMany } = dataProvider(dataProviderName);

    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    useResourceSubscription({
        resource,
        types: ["*"],
        params: { ids: ids ?? [], ...liveParams },
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetManyResponse<TData>, TError>(
        [`resource/getMany/${resource}`, { ids, ...metaData }],
        () => getMany<TData>({ resource, ids, metaData }),
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);
                handleNotification(successNotification);
            },
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                handleNotification(errorNotification, {
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
