import { useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";

import { AccessControlContext } from "@contexts/accessControl";
import { CanParams } from "../../interfaces";

export const useCan = (params: CanParams): UseQueryResult<boolean> => {
    const { can } = useContext(AccessControlContext);

    const queryResponse = useQuery<boolean>(
        ["useCan", params],
        () => can(params),
        {
            retry: false,
        },
    );

    return queryResponse;
};
