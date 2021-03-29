import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    GetListResponse,
    IDataContext,
    Sort,
    Filters,
    Pagination,
    BaseRecord,
} from "../../interfaces";

interface UseListConfig {
    pagination?: Pagination;
    search?: string;
    sort?: Sort;
    filters?: Filters;
}

const defaultConfig: UseListConfig = {
    pagination: {
        pageSize: 999,
    },
};

export const useList = <TData extends BaseRecord = BaseRecord>(
    resource: string,
    config?: UseListConfig,
    queryOptions?: UseQueryOptions<GetListResponse<TData>>,
): QueryObserverResult<GetListResponse<TData>, unknown> => {
    const { getList } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetListResponse<TData>>(
        [`resource/list/${resource}`, { ...(config ?? defaultConfig) }],
        () => getList<TData>(resource, config ?? defaultConfig),
        queryOptions ?? { keepPreviousData: true },
    );

    return queryResponse;
};
