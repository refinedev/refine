import React from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

export type UseGetIdentityProps<TData> = {
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * `useGetIdentity` calls the `getUserIdentity` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useGetIdentity} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
export const useGetIdentity = <TData = any>({
    queryOptions,
}: UseGetIdentityProps<TData> = {}): UseQueryResult<TData, unknown> => {
    const { getUserIdentity } = React.useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery<TData>("getUserIdentity", getUserIdentity!, {
        enabled: !!getUserIdentity,
        ...queryOptions,
    });

    return queryResponse;
};
