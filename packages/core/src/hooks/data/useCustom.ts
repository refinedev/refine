import {
    QueryObserverResult,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";

import {
    CustomResponse,
    CrudSorting,
    CrudFilters,
    BaseRecord,
    HttpError,
    MetaDataQuery,
    SuccessErrorNotification,
} from "../../interfaces";
import {
    useTranslate,
    useCheckError,
    useHandleNotification,
    useDataProvider,
} from "@hooks";

interface UseCustomConfig<TQuery, TPayload> {
    sort?: CrudSorting;
    filters?: CrudFilters;
    query?: TQuery;
    payload?: TPayload;
    headers?: {};
}

export type UseCustomProps<TData, TError, TQuery, TPayload> = {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    config?: UseCustomConfig<TQuery, TPayload>;
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
} & SuccessErrorNotification;

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
    TData = BaseRecord,
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
    metaData,
    dataProviderName,
}: UseCustomProps<TData, TError, TQuery, TPayload>): QueryObserverResult<
    CustomResponse<TData>,
    TError
> => {
    const dataProvider = useDataProvider();

    const { custom } = dataProvider(dataProviderName);
    const { mutate: checkError } = useCheckError();
    const translate = useTranslate();
    const handleNotification = useHandleNotification();

    if (custom) {
        const queryResponse = useQuery<CustomResponse<TData>, TError>(
            [
                dataProviderName,
                "custom",
                method,
                url,
                { ...config, ...metaData },
            ],
            ({ queryKey, pageParam, signal }) =>
                custom<TData>({
                    url,
                    method,
                    ...config,
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
                            ? successNotification(data, {
                                  ...config,
                                  ...metaData,
                              })
                            : successNotification;

                    handleNotification(notificationConfig);
                },
                onError: (err: TError) => {
                    checkError(err);
                    queryOptions?.onError?.(err);

                    const notificationConfig =
                        typeof errorNotification === "function"
                            ? errorNotification(err, { ...config, ...metaData })
                            : errorNotification;

                    handleNotification(notificationConfig, {
                        key: `${method}-notification`,
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
    } else {
        throw Error("Not implemented custom on data provider.");
    }
};
