import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    GetListResponse,
    IDataContext,
    Sort,
    Search,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
} from "../../interfaces";

interface UseListConfig {
    pagination?: Pagination;
    search?: Search;
    sort?: Sort;
    filters?: CrudFilters;
}

export const useList = <
    TData = BaseRecord,
    TError extends HttpError = HttpError
>(
    resource: string,
    config?: UseListConfig,
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>,
): QueryObserverResult<GetListResponse<TData>, TError> => {
    const { getList } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        [`resource/list/${resource}`, { ...config }],
        () => getList<TData>(resource, { ...config }),
        queryOptions ?? { keepPreviousData: true },
    );

    return queryResponse;
};
