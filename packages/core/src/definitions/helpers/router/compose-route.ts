import { MetaDataQuery, ParseResponse } from "../../../interfaces";

import { pickRouteParams } from "./pick-route-params";
import { prepareRouteParams } from "./prepare-route-params";

/**
 * This function will compose a route with the given params and meta.
 * - A route can have parameters like (eg: /users/:id)
 * - First we pick the route params from the route (eg: [id])
 * - Then we prepare the route params with the given params and meta (eg: { id: 1 })
 * - Then we replace the route params with the prepared route params (eg: /users/1)
 */
export const composeRoute = (
    designatedRoute: string,
    params: ParseResponse = {},
    meta: MetaDataQuery = {},
): string => {
    // pickRouteParams (from the route)
    const routeParams = pickRouteParams(designatedRoute);
    // prepareRouteParams (from route params, params and meta)
    const preparedRouteParams = prepareRouteParams(routeParams, params, meta);
    // replace route params with prepared route params
    return designatedRoute.replace(/:([^\/]+)/g, (match, key) => {
        const fromParams = preparedRouteParams[key];
        if (typeof fromParams !== "undefined") {
            return `${fromParams}`;
        }
        return match;
    });
};
