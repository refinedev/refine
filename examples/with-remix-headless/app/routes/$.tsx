import { json, LoaderFunction } from "@remix-run/node";
import { parseTableParams } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

import {
    RemixRouteComponent,
    handleRefineParams,
    checkAuthentication,
} from "@pankod/refine-remix-router";

import { authProvider } from "~/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

export const loader: LoaderFunction = async ({ params, request }) => {
    await checkAuthentication(authProvider, request);
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
            const url = new URL(request.url);

            const {
                parsedCurrent,
                parsedPageSize,
                parsedSorter,
                parsedFilters,
            } = parseTableParams(url.search);

            const data = await dataProvider(API_URL).getList({
                resource: resource,
                filters: parsedFilters,
                pagination: {
                    current: parsedCurrent || 1,
                    pageSize: parsedPageSize || 10,
                },
                sort: parsedSorter,
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
