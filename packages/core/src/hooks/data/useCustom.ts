import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    CustomResponse,
    IDataContext,
    Sort,
    CrudFilters,
    BaseRecord,
    HttpError,
} from "../../interfaces";

interface UseCustomConfig {
    sort?: Sort;
    filters?: CrudFilters;
    payload?: {};
}

export const useCustom = <
    TData = BaseRecord,
    TError extends HttpError = HttpError
>(
    url: string,
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
    config?: UseCustomConfig,
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>,
): QueryObserverResult<CustomResponse<TData>, TError> => {
    const { custom } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<CustomResponse<TData>, TError>(
        [`custom/${method}-${url}`, { ...config }],
        () => custom<TData>(url, method, { ...config }),
        queryOptions ?? { keepPreviousData: true },
    );

    return queryResponse;
};
