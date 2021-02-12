import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    Identifier,
    GetManyResponse,
} from "@interfaces";

export const useMany = <TData = BaseRecord>(
    resource: string,
    ids: Identifier[],
): QueryObserverResult<GetManyResponse<TData>> => {
    const { getMany } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetManyResponse<TData>>(
        `resource/list/${resource}`,
        () => getMany<TData>(resource, ids),
    );

    return queryResponse;
};
