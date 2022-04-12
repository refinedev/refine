import { json, LoaderFunction } from "@remix-run/node";
import dataProvider from "@pankod/refine-simple-rest";

export { NextRouteComponent as default } from "../../remixRouteComponent";

export const loader: LoaderFunction = async ({ params }) => {
    const API_URL = "https://api.fake-rest.refine.dev";

    try {
        const data = await dataProvider(API_URL).getList({
            resource: params.resource as string,
        });

        return json({ initialData: data });
    } catch (error) {
        return json({});
    }
};
