import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import {
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaDataQuery,
    SuccessErrorNotification,
    LiveModeProps,
    GetInfinityListResponse,
} from "../../interfaces";
import {
    useResource,
    useCheckError,
    useHandleNotification,
    useResourceSubscription,
    useTranslate,
    useDataProvider,
} from "@hooks";
import { queryKeys, pickDataProvider } from "@definitions/helpers";

export interface UseInfinityConfig {
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseInfinityListProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Configuration for pagination, sorting and filtering
     * @type [`UseInfinityConfig`](/docs/api-reference/core/hooks/data/useInfiniteList/#config-parameters)
     */
    config?: UseInfinityConfig;
    /**
     * react-query's [useInfiniteQuery](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) options,
     */
    queryOptions?: UseInfiniteQueryOptions<
        GetInfinityListResponse<TData>,
        TError
    >;
    /**
     *  Metadata query for `dataProvider`
     */
    metaData?: MetaDataQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

/**
 * `useInfiniteList` is a modified version of `react-query`'s {@link https://tanstack.com/query/latest/docs/react/guides/infinite-queries `useInfiniteQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useInfiniteList} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 *
 */
export const useInfiniteList = <
    TData extends BaseRecord = BaseRecord,
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
}: UseInfinityListProps<TData, TError>): InfiniteQueryObserverResult<
    GetInfinityListResponse<TData>,
    TError
> => {
    const { resources } = useResource();
    const dataProvider = useDataProvider();
    const queryKey = queryKeys(
        resource,
        pickDataProvider(resource, dataProviderName, resources),
        metaData,
    );
    const { getList } = dataProvider(
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

    const queryResponse = useInfiniteQuery<
        GetInfinityListResponse<TData>,
        TError
    >(
        queryKey.list(config),
        ({ queryKey, pageParam, signal }) => {
            const { hasPagination, ...restConfig } = config || {};
            const pagination = {
                ...config?.pagination,
                current: pageParam,
            };

            return getList<TData>({
                resource,
                ...restConfig,
                pagination,
                hasPagination,
                metaData: {
                    ...metaData,
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
            }).then(({ data, total }) => {
                return {
                    data,
                    total,
                    pagination,
                };
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
                    key: `${resource}-useInfiniteList-notification`,
                    message: translate(
                        "common:notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                    type: "error",
                });
            },
            getNextPageParam: (lastPage) => {
                const { pagination } = lastPage;
                const current = pagination?.current || 1;
                const pageSize = pagination?.pageSize || 10;

                const totalPages = Math.ceil((lastPage.total || 0) / pageSize);
                return current < totalPages ? Number(current) + 1 : undefined;
            },
            getPreviousPageParam: (lastPage) => {
                const { pagination } = lastPage;
                const current = pagination?.current || 1;

                return current === 1 ? undefined : current - 1;
            },
        },
    );

    return queryResponse;
};
