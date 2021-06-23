import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";
import { notification } from "antd";

import { DataContext } from "@contexts/data";
import {
    GetListResponse,
    IDataContext,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
} from "../../interfaces";
import { useTranslate } from "@hooks/translate";
import { useCheckError } from "@hooks";

interface UseListConfig {
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export const useList = <
    TData = BaseRecord,
    TError extends HttpError = HttpError,
>(
    resource: string,
    config?: UseListConfig,
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>,
): QueryObserverResult<GetListResponse<TData>, TError> => {
    const { getList } = useContext<IDataContext>(DataContext);
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        [`resource/list/${resource}`, { ...config }],
        () => getList<TData>(resource, { ...config }),
        {
            ...queryOptions,
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                notification.error({
                    key: `${resource}-notification`,
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
