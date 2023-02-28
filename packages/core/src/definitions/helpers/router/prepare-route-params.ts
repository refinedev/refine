import { MetaDataQuery, ParseResponse } from "../../../interfaces";

/**
 * Prepares the route params by checking the existing params and meta data.
 * Meta data is prioritized over params.
 * Params are prioritized over predetermined id, action and resource.
 * This means, we can use `meta` for user supplied params (both manually or from the query string)
 */
export const prepareRouteParams = <
    TRouteParams extends Record<
        string,
        string | number | undefined | Symbol
    > = Record<string, string | number | undefined | Symbol>,
>(
    routeParams: (keyof TRouteParams)[],
    params: ParseResponse = {},
    meta: MetaDataQuery = {},
): Partial<TRouteParams> => {
    // meta is prioritized over params
    return routeParams.reduce((acc, key) => {
        const value =
            meta[key as string] ||
            params.params?.[key as string] ||
            (key === "id" ? params.id : undefined) ||
            (key === "action" ? params.action : undefined) ||
            (key === "resource" ? params.resource : undefined);
        if (typeof value !== "undefined") {
            acc[key] = value;
        }
        return acc;
    }, {} as Partial<TRouteParams>);
};
