import { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import {
    useQuery,
    UseQueryResult,
    UseQueryOptions,
} from "@tanstack/react-query";

/**
 * `usePermissions` calls the `getPermissions` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/usePermissions} for more details.
 *
 * @typeParam TData - Result data of the query
 *
 */
export const usePermissions = <TData = any>(
    options?: UseQueryOptions<TData>,
): UseQueryResult<TData, unknown> => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery<TData>(
        ["usePermissions"],
        // Enabled check for `getPermissions` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
        getPermissions ?? (() => Promise.resolve(undefined)),
        {
            enabled: !!getPermissions,
            ...options,
        },
    );

    return queryResponse;
};
