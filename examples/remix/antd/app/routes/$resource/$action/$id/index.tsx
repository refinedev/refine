import { LoaderFunction } from "@remix-run/node";
import { checkAuthentication } from "@pankod/refine-remix-router";

export { RemixRouteComponent as default } from "@pankod/refine-remix-router";

import { authProvider } from "~/authProvider";

export const loader: LoaderFunction = async ({ request }) => {
    await checkAuthentication(authProvider, request);
    return null;
};
