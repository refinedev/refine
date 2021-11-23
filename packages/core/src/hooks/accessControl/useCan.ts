import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AccessControlContext } from "@contexts/accessControl";
import { CanParams, CanReturnType } from "../../interfaces";

export type UseCanProps = CanParams & {
    queryOptions?: UseQueryOptions<CanReturnType>;
};

export const useCan = ({
    action,
    resource,
    params,
    queryOptions,
}: UseCanProps): UseQueryResult<CanReturnType> => {
    const { can } = useContext(AccessControlContext);

    const queryResponse = useQuery<CanReturnType>(
        ["useCan", { action, resource, params }],
        () => can({ action, resource, params }),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
