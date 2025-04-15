// import { useContext } from "react";

// import { getXRay } from "@refinedev/devtools-internal";
// import {
//   type UseQueryOptions,
//   type UseQueryResult,
//   useQuery,
// } from "@tanstack/react-query";

// import { AccessControlContext } from "@contexts/accessControl";
// import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
// import { useKeys } from "@hooks/useKeys";
// import type {
//   CanParams,
//   CanReturnType,
// } from "../../../contexts/accessControl/types";

// export type UseCanProps = CanParams & {
//   /**
//    * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
//    */
//   queryOptions?: UseQueryOptions<CanReturnType>;
// };

// /**
//  * `useCan` uses the `can` as the query function for `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`}. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.
//  * @see {@link https://refine.dev/docs/api-reference/core/hooks/accessControl/useCan} for more details.
//  *
//  * @typeParam CanParams {@link https://refine.dev/docs/core/interfaceReferences#canparams}
//  * @typeParam CanReturnType {@link https://refine.dev/docs/core/interfaceReferences#canreturntype}
//  *
//  */
// export const useCan = ({
//   action,
//   resource,
//   params,
//   queryOptions: hookQueryOptions,
// }: UseCanProps): UseQueryResult<CanReturnType> => {
//   const { can, options: globalOptions } = useContext(AccessControlContext);
//   const { keys, preferLegacyKeys } = useKeys();

//   const { queryOptions: globalQueryOptions } = globalOptions || {};

//   const mergedQueryOptions = {
//     ...globalQueryOptions,
//     ...hookQueryOptions,
//   };

//   /**
//    * Since `react-query` stringifies the query keys, it will throw an error for a circular dependency if we include `React.ReactNode` elements inside the keys.
//    * The feature in #2220(https://github.com/refinedev/refine/issues/2220) includes such change and to fix this, we need to remove `icon` property in the `resource`
//    */
//   const { resource: _resource, ...paramsRest } = params ?? {};

//   const sanitizedResource = sanitizeResource(_resource);

//   const queryResponse = useQuery<CanReturnType>({
//     queryKey: keys()
//       .access()
//       .resource(resource)
//       .action(action)
//       .params({
//         params: { ...paramsRest, resource: sanitizedResource },
//         enabled: mergedQueryOptions?.enabled,
//       })
//       .get(preferLegacyKeys),
//     // Enabled check for `can` is enough to be sure that it's defined in the query function but TS is not smart enough to know that.
//     queryFn: () =>
//       can?.({
//         action,
//         resource,
//         params: { ...paramsRest, resource: sanitizedResource },
//       }) ?? Promise.resolve({ can: true }),
//     enabled: typeof can !== "undefined",
//     ...mergedQueryOptions,
//     meta: {
//       ...mergedQueryOptions?.meta,
//       ...getXRay("useCan", preferLegacyKeys, resource, [
//         "useButtonCanAccess",
//         "useNavigationButton",
//       ]),
//     },
//     retry: false,
//   });

//   return typeof can === "undefined"
//     ? ({ data: { can: true } } as typeof queryResponse)
//     : queryResponse;
// };

import { useContext, useRef } from "react";
import { getXRay } from "@refinedev/devtools-internal";
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { AccessControlContext } from "@contexts/accessControl";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { useKeys } from "@hooks/useKeys";
import type {
  CanParams,
  CanReturnType,
} from "../../../contexts/accessControl/types";

export type UseCanProps = CanParams & {
  /**
   * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
   */
  queryOptions?: UseQueryOptions<CanReturnType>;
};

/**
 * Custom cache for `can` function results to optimize performance.
 */
const canCache = new Map<string, { result: CanReturnType; timestamp: number }>();

/**
 * `useCan` uses the `can` as the query function for `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`}. 
 * It now includes a custom cache for `can` results to optimize performance by reducing repeated calls.
 *
 * @typeParam CanParams {@link https://refine.dev/docs/core/interfaceReferences#canparams}
 * @typeParam CanReturnType {@link https://refine.dev/docs/core/interfaceReferences#canreturntype}
 *
 */
export const useCan = ({
  action,
  resource,
  params,
  queryOptions: hookQueryOptions,
}: UseCanProps): UseQueryResult<CanReturnType> => {
  const { can, options: globalOptions } = useContext(AccessControlContext);
  const { keys, preferLegacyKeys } = useKeys();

  const mergedQueryOptions: UseQueryOptions<CanReturnType> = {
    ...(globalOptions?.queryOptions ?? {}),
    ...(hookQueryOptions ?? {}),
    enabled:
      hookQueryOptions?.enabled ??
      globalOptions?.queryOptions?.enabled ??
      typeof can !== "undefined",
    meta: {
      ...(globalOptions?.queryOptions?.meta ?? {}),
      ...(hookQueryOptions?.meta ?? {}),
      ...getXRay("useCan", preferLegacyKeys, resource, [
        "useButtonCanAccess",
        "useNavigationButton",
      ]),
    },
    retry: false,
  };

  const { resource: _resource, ...paramsRest } = params ?? {};
  const sanitizedResource = sanitizeResource(_resource);

  // Custom caching logic
  const cacheKey = `${resource}-${action}-${JSON.stringify(paramsRest)}`;
  const cacheDuration = mergedQueryOptions?.staleTime || 5 * 60 * 1000; // Default to 5 minutes
  const cacheEntry = canCache.get(cacheKey);

  // Check if we have a cached value and if it's still valid
  if (cacheEntry && Date.now() - cacheEntry.timestamp < cacheDuration) {
    return { data: cacheEntry.result } as UseQueryResult<CanReturnType>;
  }

  const queryResponse = useQuery<CanReturnType>({
    ...mergedQueryOptions,
    queryKey: keys()
      .access()
      .resource(resource)
      .action(action)
      .params({
        params: { ...paramsRest, resource: sanitizedResource },
        enabled: mergedQueryOptions?.enabled,
      })
      .get(preferLegacyKeys),
    queryFn: async () => {
      const result = await (can?.({
        action,
        resource,
        params: { ...paramsRest, resource: sanitizedResource },
      }) ?? Promise.resolve({ can: true }));

      // Cache the result for future use
      canCache.set(cacheKey, { result, timestamp: Date.now() });

      return result;
    },
    enabled: typeof can !== "undefined",
    meta: mergedQueryOptions.meta,
    retry: false,
  });

  return queryResponse;
};
