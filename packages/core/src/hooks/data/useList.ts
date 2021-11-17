import { useContext, useEffect } from "react";
import {
    QueryObserverResult,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from "react-query";
import { ArgsProps } from "antd/lib/notification";
import { debounce } from "lodash";

import { DataContext, LiveDataContext } from "@contexts/data";
import {
    GetListResponse,
    IDataContext,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaDataQuery,
    LiveEvent,
    ILiveContext,
} from "../../interfaces";
import { useCacheQueries, useCheckError, useTranslate } from "@hooks";
import { handleNotification } from "@definitions";

interface UseListConfig {
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseListProps<TData, TError> = {
    resource: string;
    config?: UseListConfig;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    successNotification?: ArgsProps | false;
    errorNotification?: ArgsProps | false;
    metaData?: MetaDataQuery;
    liveMode?: undefined | "immediate" | "controlled";
    onLiveEvent?: (event: LiveEvent) => void;
};

/**
 * `useList` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useList} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
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
}: UseListProps<TData, TError>): QueryObserverResult<
    GetListResponse<TData>,
    TError
> => {
    const { getList } = useContext<IDataContext>(DataContext);
    const liveDataContext = useContext<ILiveContext>(LiveDataContext);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const queryClient = useQueryClient();
    const getAllQueries = useCacheQueries();

    useEffect(() => {
        if (liveDataContext) {
            const { subscribe, unsubscribe } = liveDataContext;

            const subscription = subscribe(
                `resources/${resource}`,
                "*",
                (event) => {
                    console.log("event", event);

                    if (liveMode === "immediate") {
                        getAllQueries(resource).forEach((query) => {
                            queryClient.invalidateQueries(query.queryKey);
                        });
                    } else {
                        onLiveEvent?.(event);
                    }
                },
            );

            return () => {
                unsubscribe(subscription);
            };
        }

        return () => undefined;
    }, []);

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        [`resource/list/${resource}`, { ...config }],
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
