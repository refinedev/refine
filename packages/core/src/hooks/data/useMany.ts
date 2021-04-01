import { useContext } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    Identifier,
    GetManyResponse,
} from "../../interfaces";

export const useMany = (
    resource: string,
    ids: Identifier[],
): QueryObserverResult<GetManyResponse<BaseRecord>> => {
    const { getMany } = useContext<IDataContext>(DataContext);

    const queryResponse = useQuery<GetManyResponse<BaseRecord>>(
        `resource/list/${resource}`,
        () => getMany(resource, ids),
    );

    return queryResponse;
};
