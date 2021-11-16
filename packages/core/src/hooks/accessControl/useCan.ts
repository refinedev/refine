import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AccessControlContext } from "@contexts/accessControl";
import { CanParams } from "../../interfaces";

export const useCan = (
    params: CanParams,
    queryOptions?: UseQueryOptions<boolean>,
): UseQueryResult<boolean> => {
    const { can } = useContext(AccessControlContext);

    const queryResponse = useQuery<boolean>(
        ["useCan", { ...params }],
        () => can(params),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
