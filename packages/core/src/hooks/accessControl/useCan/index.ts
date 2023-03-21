import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import { useContext } from "react";

import { AccessControlContext } from "@contexts/accessControl";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { CanParams, CanReturnType } from "../../../interfaces";

export type UseCanProps = CanParams & {
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
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

    /**
     * Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
     * The feature in #2220(https://github.com/refinedev/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`
     */
    const { resource: _resource, ...paramsRest } = params ?? {};

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const sanitizedResource = sanitizeResource(_resource ?? {});

    /* eslint-enable @typescript-eslint/no-unused-vars */
    const queryResponse = useQuery<CanReturnType>(
        [
            "useCan",
            {
                action,
                resource,
                params: { ...paramsRest, resource: sanitizedResource },
                enabled: queryOptions?.enabled,
            },
        ],
        // Enabled check for `can` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
        () =>
            can?.({ action, resource, params: paramsRest }) ??
            Promise.resolve({ can: true }),
        {
            enabled: typeof can !== "undefined",
            ...queryOptions,
            retry: false,
        },
    );

    return typeof can === "undefined"
        ? ({ data: { can: true } } as typeof queryResponse)
        : queryResponse;
};
