import { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult } from "react-query";

export const usePermissions = <TData = any>(): UseQueryResult<
    TData,
    unknown
> => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery<TData>("usePermissions", getPermissions, {
        enabled: !!getPermissions,
    });

    return queryResponse;
};
