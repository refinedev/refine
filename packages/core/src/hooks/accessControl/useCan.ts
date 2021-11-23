import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AccessControlContext } from "@contexts/accessControl";
import { CanParams } from "../../interfaces";

export type UseCanProps = CanParams & {
    queryOptions?: UseQueryOptions<boolean>;
};

export const useCan = ({
    action,
    resource,
    params,
    queryOptions,
}: UseCanProps): UseQueryResult<boolean> => {
    const { can } = useContext(AccessControlContext);

    const queryResponse = useQuery<boolean>(
        ["useCan", { action, resource, params }],
        () => can({ action, resource, params }),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
