import {
    QueryObserverResult,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";

import { pickNotDeprecated, useActiveAuthProvider } from "@definitions/helpers";
import {
    useDataProvider,
    useHandleNotification,
    useOnError,
    useTranslate,
} from "@hooks";
import {
    BaseRecord,
    CrudFilters,
    CrudSorting,
    CustomResponse,
    HttpError,
    MetaQuery,
    Prettify,
    SuccessErrorNotification,
} from "../../interfaces";

interface UseCustomConfig<TQuery, TPayload> {
    /**
     * @deprecated `sort` is deprecated, use `sorters` instead.
     */
    sort?: CrudSorting;
    sorters?: CrudSorting;
    filters?: CrudFilters;
    query?: TQuery;
    payload?: TPayload;
    headers?: {};
}

export type UseCustomProps<TData, TError, TQuery, TPayload> = {
    /**
     * request's URL
     */
    url: string;
    /**
     * request's method (`GET`, `POST`, etc.)
     */
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    /**
     * The config of your request. You can send headers, payload, query, filters and sorters using this field
     */
    config?: UseCustomConfig<TQuery, TPayload>;
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options"
     */
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>;
    /**
     * meta data for `dataProvider`
     */
    meta?: MetaQuery;
    /**
     * meta data for `dataProvider`
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
} & SuccessErrorNotification<
    CustomResponse<TData>,
    TError,
    Prettify<UseCustomConfig<TQuery, TPayload> & MetaQuery>
>;

/**
 * `useCustom` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for custom requests.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useCustom} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TQuery - Values for query params
 * @typeParam TPayload - Values for params
 *
 */
export const useCustom = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TQuery = unknown,
    TPayload = unknown,
>({
    url,
    method,
    config,
    queryOptions,
    successNotification,
    errorNotification,
    meta,
    metaData,
    dataProviderName,
}: UseCustomProps<TData, TError, TQuery, TPayload>): QueryObserverResult<
    CustomResponse<TData>,
    TError
> => {
    const dataProvider = useDataProvider();

    const { custom } = dataProvider(dataProviderName);
    const authProvider = useActiveAuthProvider();
    const { mutate: checkError } = useOnError({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const translate = useTranslate();
    const handleNotification = useHandleNotification();

    if (custom) {
        const queryResponse = useQuery<CustomResponse<TData>, TError>({
            queryKey: [
                dataProviderName,
                "custom",
                method,
                url,
                { ...config, ...(pickNotDeprecated(meta, metaData) || {}) },
            ],
            queryFn: ({ queryKey, pageParam, signal }) =>
                custom<TData>({
                    url,
                    method,
                    ...config,
                    metaData: {
                        ...(pickNotDeprecated(meta, metaData) || {}),
                        queryContext: {
                            queryKey,
                            pageParam,
                            signal,
                        },
                    },
                }),
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(data, {
                              ...config,
                              ...(pickNotDeprecated(meta, metaData) || {}),
                          })
                        : successNotification;

                handleNotification(notificationConfig);
            },
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                const notificationConfig =
                    typeof errorNotification === "function"
                        ? errorNotification(err, {
                              ...config,
                              ...(pickNotDeprecated(meta, metaData) || {}),
                          })
                        : errorNotification;

                handleNotification(notificationConfig, {
                    key: `${method}-notification`,
                    message: translate(
                        "notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                    type: "error",
                });
            },
        });
        return queryResponse;
    } else {
        throw Error("Not implemented custom on data provider.");
    }
};
