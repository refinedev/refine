import { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

export const usePermissions = <TData = any>(
    options?: UseQueryOptions<TData>,
): UseQueryResult<TData, unknown> => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery<TData>(
        "usePermissions",
        getPermissions,
        options,
    );

    return queryResponse;
};
