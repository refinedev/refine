import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import { GetListResponse, IDataContext } from "@interfaces";

export const useList = (
    resource: string,
    current = 1,
    pageSize = 999,
): QueryObserverResult<GetListResponse, unknown> => {
    const { getList } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetListResponse>(
        [`resource/list/${resource}`, { current, pageSize }],
        () =>
            getList(resource, {
                pagination: {
                    current,
                    pageSize,
                },
            }),
        {
            keepPreviousData: true,
        },
    );

    return queryResponse;
};
