import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import {
    GetOneResponse,
    HttpError,
    BaseRecord,
    BaseKey,
    MetaDataQuery,
    LiveModeProps,
    OpenNotificationParams,
} from "../../interfaces";
import {
    useCheckError,
    useTranslate,
    useResourceSubscription,
    useHandleNotification,
    useDataProvider,
} from "@hooks";

export type UseOneProps<TData, TError> = {
    resource: string;
    id: BaseKey;
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, TError>;
    successNotification?: OpenNotificationParams | false;
    errorNotification?: OpenNotificationParams | false;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & LiveModeProps;

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

    const { getOne } = dataProvider(dataProviderName);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    useResourceSubscription({
        resource,
        types: ["*"],
        channel: `resources/${resource}`,
        params: { ids: id ? [id] : [], ...liveParams },
        enabled: queryOptions?.enabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetOneResponse<TData>, TError>(
        [`resource/getOne/${resource}`, { id, ...metaData }],
        () => getOne<TData>({ resource, id, metaData }),
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
