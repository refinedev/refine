import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-remix-router";

import { PostCreate, PostList } from "./pages/posts";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Refine
                    dataProvider={dataProvider(API_URL)}
                    routerProvider={routerProvider}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                        },
                    ]}
                >
                    <Outlet />
                </Refine>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
