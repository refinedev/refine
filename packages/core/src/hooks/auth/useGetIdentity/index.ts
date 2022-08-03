import React from "react";
import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";

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

    const queryResponse = useQuery<TData>(
        ["getUserIdentity"],
        // Enabled check for `getUserIdentity` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
        getUserIdentity ?? (() => Promise.resolve({})),
        {
            enabled: !!getUserIdentity,
            retry: false,
            ...queryOptions,
        },
    );

    return queryResponse;
};
