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
    MetaQuery,
    SuccessErrorNotification,
    LiveModeProps,
} from "../../interfaces";
import {
    useResource,
    useCheckError,
    useHandleNotification,
    useResourceSubscription,
    useTranslate,
    useDataProvider,
} from "@hooks";
import {
    queryKeys,
    pickDataProvider,
    pickNotDeprecated,
} from "@definitions/helpers";

export interface UseListConfig {
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseListProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Configuration for pagination, sorting and filtering
     * @type [`UseListConfig`](/docs/api-reference/core/hooks/data/useList/#config-parameters)
     * @deprecated `config` property is deprecated. Use `pagination`, `hasPagination`, `sorters` and `filters` instead.
     */
    config?: UseListConfig;
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
     * Tanstack Query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    /**
     * Meta data query for `dataProvider`
     */
    meta?: MetaQuery;
    /**
     * Meta data query for `dataProvider`
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use
     */
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
}: UseListProps<TData, TError>): QueryObserverResult<
    GetListResponse<TData>,
    TError
> => {
    const { resources } = useResource();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
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
    const hasPaginationString =
        prefferedHasPagination === false ? "off" : "server";
    const prefferedPagination = {
        current:
            pickNotDeprecated(
                pagination?.current,
                config?.pagination?.current,
            ) ?? 1,
        pageSize:
            pickNotDeprecated(
                pagination?.pageSize,
                config?.pagination?.pageSize,
            ) ?? 10,
        mode: pagination?.mode ?? hasPaginationString,
    };
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

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
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
            return getList<TData>({
                resource,
                pagination: prefferedPagination,
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
            });
        },
        {
            ...queryOptions,
            select: (rawData) => {
                let data = rawData;

                const { current, mode, pageSize } = prefferedPagination;

                if (mode === "client") {
                    data = {
                        data: data.data.slice(
                            (current - 1) * pageSize,
                            current * pageSize,
                        ),
                        total: data.total,
                    };
                }

                if (queryOptions?.select) {
                    return queryOptions?.select?.(data);
                }

                return data;
            },
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
                    key: `${resource}-useList-notification`,
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
