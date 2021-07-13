import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import { ArgsProps } from "antd/lib/notification";

import { DataContext } from "@contexts/data";
import {
    CustomResponse,
    IDataContext,
    CrudSorting,
    CrudFilters,
    BaseRecord,
    HttpError,
} from "../../interfaces";
import { useCheckError } from "@hooks";
import { useTranslate } from "@hooks/translate";
import { handleNotification } from "@definitions/helpers";

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
    TPayload = unknown,
>(
    url: string,
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
    config?: UseCustomConfig<TQuery, TPayload>,
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>,
    successNotification?: ArgsProps | false,
    errorNotification?: ArgsProps | false,
): QueryObserverResult<CustomResponse<TData>, TError> => {
    const { custom } = useContext<IDataContext>(DataContext);
    const { mutate: checkError } = useCheckError();
    const translate = useTranslate();

    const queryResponse = useQuery<CustomResponse<TData>, TError>(
        [`custom/${method}-${url}`, { ...config }],
        () => custom<TData>(url, method, { ...config }),
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
};
