import { json, LoaderFunction } from "@remix-run/node";
import dataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "~/authProvider";

import {
    RemixRouteComponent,
    checkAuthentication,
    handleRefineParams,
} from "@pankod/refine-remix-router";

export const loader: LoaderFunction = async ({
    params,
    request,
    context: _context,
}) => {
    await checkAuthentication(authProvider, request);
    const API_URL = "https://api.fake-rest.refine.dev";

    const refineSplatParams = handleRefineParams(params["*"]);

    const {
        resource = undefined,
        action = undefined,
        id = undefined,
    } = { ...refineSplatParams, ...params };

    try {
        if (resource && action === "show" && id) {
            const data = await dataProvider(API_URL).getOne({
                resource: `${resource}`.slice(
                    `${resource}`.lastIndexOf("/") + 1,
                ),
                id,
            });

            return json({ initialData: data });
        } else if (resource && !action && !id) {
            const data = await dataProvider(API_URL).getList({
                resource: `${resource}`.slice(
                    `${resource}`.lastIndexOf("/") + 1,
                ),
            });

            return json({ initialData: data });
        }

        return null;
    } catch (error) {
        return json({});
    }
};

export default RemixRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `RemixRouteComponent` like the following:
 *
 * export default RemixRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
