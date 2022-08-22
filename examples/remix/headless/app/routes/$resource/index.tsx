import { json, LoaderFunction } from "@remix-run/node";
import dataProvider from "@pankod/refine-simple-rest";
import { parseTableParams } from "@pankod/refine-core";
import { requireUserId } from "~/session.server";

export { RemixRouteComponent as default } from "@pankod/refine-remix-router";

const API_URL = "https://api.fake-rest.refine.dev";
export const loader: LoaderFunction = async ({ params, request }) => {
    await requireUserId(request);

    const { resource } = params;
    const url = new URL(request.url);

    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(url.search);

    try {
        const data = await dataProvider(API_URL).getList({
            resource: resource as string,
            filters: parsedFilters,
            pagination: {
                current: parsedCurrent || 1,
                pageSize: parsedPageSize || 10,
            },
            sort: parsedSorter,
        });

        return json({ initialData: data });
    } catch (error) {
        return json({});
    }
};
