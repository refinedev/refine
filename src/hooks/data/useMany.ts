import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    Identifier,
    GetManyResponse,
} from "@interfaces";

export const useMany = <TData extends BaseRecord = BaseRecord>() => {
    const { getMany } = useContext<IDataContext>(DataContext);

    return (
        resource: string,
        ids: Identifier[],
    ): QueryObserverResult<GetManyResponse<TData>> =>
        useQuery<GetManyResponse<TData>>(`resource/list/${resource}`, () =>
            getMany<TData>(resource, ids),
        );
};
