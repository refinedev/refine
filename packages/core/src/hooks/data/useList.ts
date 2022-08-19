import {
    QueryObserverResult,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";
import {
    GetListResponse,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaDataQuery,
    SuccessErrorNotification,
    LiveModeProps,
} from "../../interfaces";
import {
    useCheckError,
    useHandleNotification,
    useResourceSubscription,
    useTranslate,
    useDataProvider,
} from "@hooks";
import { queryKeys } from "@definitions/helpers";

export interface UseListConfig {
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseListProps<TData, TError> = {
    resource: string;
    config?: UseListConfig;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

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
    const queryKey = queryKeys(resource, dataProviderName, metaData);
    const { getList } = dataProvider(dataProviderName);

    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    useResourceSubscription({
        resource,
        types: ["*"],
        params: {
            metaData,
            pagination: config?.pagination,
            hasPagination: config?.hasPagination,
            sort: config?.sort,
            filters: config?.filters,
            subscriptionType: "useList",
            ...liveParams,
        },
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        queryKey.list(config),
        ({ queryKey, pageParam, signal }) => {
            const { hasPagination, ...restConfig } = config || {};
            return getList<TData>({
                resource,
                ...restConfig,
                hasPagination,
                metaData: {
                    ...metaData,
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
            });
        },
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(
                              data,
                              { metaData, config },
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
                        ? errorNotification(err, { metaData, config }, resource)
                        : errorNotification;

                handleNotification(notificationConfig, {
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
