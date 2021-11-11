import { useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";

import { RbacContext } from "@contexts/rbac";
import { CanParams } from "../../interfaces";

export const useCan = (params: CanParams): UseQueryResult<boolean> => {
    const { can } = useContext(RbacContext);

    const queryResponse = useQuery<boolean>(
        ["useCan", params],
        () => can(params),
        {
            retry: false,
        },
    );

    return queryResponse;
};
