import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, BaseRecord, IDataContext } from "@interfaces";

export const useOne = <TData extends BaseRecord = BaseRecord>() => {
    const { getOne } = useContext<IDataContext>(DataContext);

    return (
        resource: string,
        id: string,
        options?: UseQueryOptions<GetOneResponse<TData>>,
    ): QueryObserverResult<GetOneResponse<TData>> =>
        useQuery<GetOneResponse<TData>>(
            [`resource/getOne/${resource}`, { id }],
            () => getOne<TData>(resource, id),
            options,
        );
};
