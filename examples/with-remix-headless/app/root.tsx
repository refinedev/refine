import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { AuthPage, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/remix-router";

import { PostCreate, PostEdit, PostList } from "./pages/posts";
import { authProvider } from "./authProvider";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix + Refine App",
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
                    legacyRouterProvider={routerProvider}
                    legacyAuthProvider={authProvider}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                            edit: PostEdit,
                        },
                    ]}
                    LoginPage={AuthPage}
                    options={{ syncWithLocation: true }}
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
