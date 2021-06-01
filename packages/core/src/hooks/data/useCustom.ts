import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    CustomResponse,
    IDataContext,
    CrudSorting,
    CrudFilters,
    BaseRecord,
    HttpError,
} from "../../interfaces";
import { useNotification, useCheckError } from "@hooks";
import { useTranslate } from "@hooks/translate";

interface UseCustomConfig<TQuery, TPayload> {
    sort?: CrudSorting;
    filters?: CrudFilters;
    query?: TQuery;
    payload?: TPayload;
    headers?: {};
}

export const useCustom = <
    TData = BaseRecord,
    TError extends HttpError = HttpError,
    TQuery = unknown,
    TPayload = unknown
>(
    url: string,
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
    config?: UseCustomConfig<TQuery, TPayload>,
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>,
): QueryObserverResult<CustomResponse<TData>, TError> => {
    const { custom } = useContext<IDataContext>(DataContext);
    const notification = useNotification();
    const checkError = useCheckError();
    const translate = useTranslate();

    const queryResponse = useQuery<CustomResponse<TData>, TError>(
        [`custom/${method}-${url}`, { ...config }],
        () => custom<TData>(url, method, { ...config }),
        {
            ...(queryOptions ?? { keepPreviousData: true }),
            onError: (err: TError) => {
                checkError?.(err);
                queryOptions?.onError?.(err);

                notification.error({
                    key: `${method}-notification`,
                    message: translate(
                        "common:notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                });
            },
        },
    );

    return queryResponse;
};
