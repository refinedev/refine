import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult } from "react-query";

export const useGetIdentity = (): UseQueryResult<any, unknown> => {
    const { getUserIdentity } = React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery("getUserIdentity", getUserIdentity!, {
        enabled: !!getUserIdentity,
    });

    return queryResponse;
};
