import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, BaseRecord, IDataContext } from "@interfaces";

export const useOne = <TData = BaseRecord>(
    resource: string,
    id: string,
): QueryObserverResult<GetOneResponse<TData>> => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetOneResponse<TData>>(
        `resource/getOne/${resource}`,
        () => getOne<TData>(resource, id),
    );

    return queryResponse;
};
