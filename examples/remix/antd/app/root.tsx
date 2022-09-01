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
import { Layout, LoginPage, ReadyPage } from "@pankod/refine-antd";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-remix-router";

import resetStyle from "@pankod/refine-antd/dist/reset.min.css";
import antdStyle from "@pankod/refine-antd/dist/antd.min.css";

import { authProvider } from "./authProvider";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";

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
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    Layout={Layout}
                    LoginPage={LoginPage}
                    ReadyPage={ReadyPage}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                            edit: PostEdit,
                            show: PostShow,
                        },
                    ]}
                    options={{ syncWithLocation: true, disableTelemetry: true }}
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

export function links() {
    return [
        { rel: "stylesheet", href: antdStyle },
        { rel: "stylesheet", href: resetStyle },
    ];
}
