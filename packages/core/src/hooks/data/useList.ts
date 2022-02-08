import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import {
    GetListResponse,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaDataQuery,
    LiveModeProps,
    OpenNotificationParams,
} from "../../interfaces";
import {
    useCheckError,
    useHandleNotification,
    useResourceSubscription,
    useTranslate,
    useDataProvider,
} from "@hooks";

interface UseListConfig {
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseListProps<TData, TError> = {
    resource: string;
    config?: UseListConfig;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    successNotification?: OpenNotificationParams | false;
    errorNotification?: OpenNotificationParams | false;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & LiveModeProps;

/**
 * `useList` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useList} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 *
 */
export const useList = <
    TData = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    config,
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams,
    dataProviderName,
}: UseListProps<TData, TError>): QueryObserverResult<
    GetListResponse<TData>,
    TError
> => {
    const dataProvider = useDataProvider();

    const { getList } = dataProvider(dataProviderName);

    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    useResourceSubscription({
        resource,
        types: ["*"],
        params: liveParams,
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        [`resource/list/${resource}`, { ...config, ...metaData }],
        () => getList<TData>({ resource, ...config, metaData }),
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
                    key: `${resource}-useList-notification`,
                    message: translate(
                        "common:notifications.error",
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
