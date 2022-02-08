import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AccessControlContext } from "@contexts/accessControl";
import { CanParams, CanReturnType } from "../../../interfaces";

export type UseCanProps = CanParams & {
    queryOptions?: UseQueryOptions<CanReturnType>;
};

/**
 * `useCan` uses the `can` as the query function for `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`}. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.
 * @see {@link https://refine.dev/docs/core/hooks/accessControl/useCan} for more details.
 *
 * @typeParam CanParams {@link https://refine.dev/docs/core/interfaceReferences#canparams}
 * @typeParam CanReturnType {@link https://refine.dev/docs/core/interfaceReferences#canreturntype}
 *
 */
export const useCan = ({
    action,
    resource,
    params,
    queryOptions,
}: UseCanProps): UseQueryResult<CanReturnType> => {
    const { can } = useContext(AccessControlContext);

    const queryResponse = useQuery<CanReturnType>(
        ["useCan", { action, resource, params }],
        () => can({ action, resource, params }),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
