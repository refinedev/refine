import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, BaseRecord, IDataContext } from "@interfaces";

export const useOne = <TData extends BaseRecord = BaseRecord>(
    resource: string,
    id: string,
    fields?: string[],
    options?: UseQueryOptions<GetOneResponse<TData>>,
): QueryObserverResult<GetOneResponse<TData>> => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetOneResponse<TData>>(
        `resource/getOne/${resource}`,
        () => getOne<TData>(resource, id, fields),
        options,
    );

    return queryResponse;
};
