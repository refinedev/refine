import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import { GetOneResponse, IDataContext } from "@interfaces";

export const useOne = (
    resource: string,
    id: string,
    fields?: string[],
    options?: UseQueryOptions<GetOneResponse>,
): QueryObserverResult<GetOneResponse> => {
    const { getOne } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetOneResponse>(
        `resource/getOne/${resource}`,
        () => getOne(resource, id, fields),
        options,
    );

    return queryResponse;
};
