import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    InfiniteQueryObserverResult,
    InfiniteData,
} from "@tanstack/react-query";
import {
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaQuery,
    SuccessErrorNotification,
    LiveModeProps,
    GetListResponse,
    Prettify,
} from "../../interfaces";
import {
    useResource,
    useHandleNotification,
    useResourceSubscription,
    useTranslate,
    useDataProvider,
    useOnError,
} from "@hooks";
import {
    queryKeys,
    pickDataProvider,
    getNextPageParam,
    getPreviousPageParam,
    pickNotDeprecated,
    useActiveAuthProvider,
    handlePaginationParams,
} from "@definitions/helpers";

export interface UseInfiniteListConfig {
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

type BaseInfiniteListProps = {
    /**
     *  Metadata query for `dataProvider`
     */
    meta?: MetaQuery;
    /**
     *  Metadata query for `dataProvider`
     *  @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * Configuration for pagination, sorting and filtering
     * @type [`useInfiniteListConfig`](/docs/api-reference/core/hooks/data/useInfiniteList/#config-parameters)
     * @deprecated `config` property is deprecated. Use `pagination`, `hasPagination`, `sorters` and `filters` instead.
     */
    config?: UseInfiniteListConfig;
    /**
     * Pagination properties
     */
    pagination?: Pagination;
    /**
     * Whether to use server-side pagination or not
     * @deprecated `hasPagination` property is deprecated. Use `pagination.mode` instead.
     */
    hasPagination?: boolean;
    /**
     * Sorter parameters
     */
    sorters?: CrudSorting;
    /**
     * Filter parameters
     */
    filters?: CrudFilters;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use
     */
    dataProviderName?: string;
};

export type UseInfiniteListProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Tanstack Query's [useInfiniteQuery](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) options
     */
    queryOptions?: UseInfiniteQueryOptions<GetListResponse<TData>, TError>;
} & BaseInfiniteListProps &
    SuccessErrorNotification<
        InfiniteData<GetListResponse<TData>>,
        TError,
        Prettify<BaseInfiniteListProps>
    > &
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
    filters,
    hasPagination,
    pagination,
    sorters,
    queryOptions,
    successNotification,
    errorNotification,
    meta,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams,
    dataProviderName,
}: UseInfiniteListProps<TData, TError>): InfiniteQueryObserverResult<
    GetListResponse<TData>,
    TError
> => {
    const { resources } = useResource();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const handleNotification = useHandleNotification();

    const pickedDataProvider = pickDataProvider(
        resource,
        dataProviderName,
        resources,
    );
    const preferredMeta = pickNotDeprecated(meta, metaData);
    const prefferedFilters = pickNotDeprecated(filters, config?.filters);
    const prefferedSorters = pickNotDeprecated(sorters, config?.sort);
    const prefferedHasPagination = pickNotDeprecated(
        hasPagination,
        config?.hasPagination,
    );
    const prefferedPagination = handlePaginationParams({
        pagination,
        configPagination: config?.pagination,
        hasPagination: prefferedHasPagination,
    });
    const isServerPagination = prefferedPagination.mode === "server";
    const notificationValues = {
        meta: preferredMeta,
        metaData: preferredMeta,
        filters: prefferedFilters,
        hasPagination: isServerPagination,
        pagination: prefferedPagination,
        sorters: prefferedSorters,
        config: {
            ...config,
            sort: prefferedSorters,
        },
    };

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    const queryKey = queryKeys(
        resource,
        pickedDataProvider,
        preferredMeta,
        preferredMeta,
    );

    const { getList } = dataProvider(pickedDataProvider);

    useResourceSubscription({
        resource,
        types: ["*"],
        params: {
            meta: preferredMeta,
            metaData: preferredMeta,
            pagination: prefferedPagination,
            hasPagination: isServerPagination,
            sort: prefferedSorters,
            sorters: prefferedSorters,
            filters: prefferedFilters,
            subscriptionType: "useList",
            ...liveParams,
        },
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useInfiniteQuery<GetListResponse<TData>, TError>(
        queryKey.list({
            filters: prefferedFilters,
            hasPagination: isServerPagination,
            ...(isServerPagination && {
                pagination: prefferedPagination,
            }),
            ...(sorters && {
                sorters,
            }),
            ...(config?.sort && {
                sort: config?.sort,
            }),
        }),
        ({ queryKey, pageParam, signal }) => {
            const paginationProperties = {
                ...prefferedPagination,
                current: pageParam,
            };

            return getList<TData>({
                resource,
                pagination: paginationProperties,
                hasPagination: isServerPagination,
                filters: prefferedFilters,
                sort: prefferedSorters,
                sorters: prefferedSorters,
                meta: {
                    ...(preferredMeta || {}),
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
                metaData: {
                    ...(preferredMeta || {}),
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
            }).then(({ data, total, ...rest }) => {
                return {
                    data,
                    total,
                    pagination: paginationProperties,
                    ...rest,
                };
            });
        },
        {
            getNextPageParam: (lastPage) => getNextPageParam(lastPage),
            getPreviousPageParam: (lastPage) => getPreviousPageParam(lastPage),
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(
                              data,
                              notificationValues,
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
                        ? errorNotification(err, notificationValues, resource)
                        : errorNotification;

                handleNotification(notificationConfig, {
                    key: `${resource}-useInfiniteList-notification`,
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
