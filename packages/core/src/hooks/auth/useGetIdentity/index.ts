import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult } from "react-query";

export const useGetIdentity = <TData = any>(): UseQueryResult<
    TData,
    unknown
> => {
    const { getUserIdentity } = React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery<TData>("getUserIdentity", getUserIdentity!, {
        enabled: !!getUserIdentity,
    });

    return queryResponse;
};
