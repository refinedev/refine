import React from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult } from "react-query";

/**
 * `useGetIdentity` calls the `getUserIdentity` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useGetIdentity} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
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
