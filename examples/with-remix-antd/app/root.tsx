import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { Refine } from "@refinedev/core";
import {
    AuthPage,
    ErrorComponent,
    Layout,
    notificationProvider,
    ReadyPage,
} from "@refinedev/antd";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/remix-router";

import resetStyle from "@refinedev/antd";

import { authProvider } from "./authProvider";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix + Refine App",
    viewport: "width=device-width,initial-scale=1",
});

const API_URL = "https://api.fake-rest.refine.dev";
export default function App(): JSX.Element {
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
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    LoginPage={() => (
                        <AuthPage
                            formProps={{
                                initialValues: {
                                    email: "admin@refine.dev",
                                    password: "password",
                                },
                            }}
                        />
                    )}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                            edit: PostEdit,
                            show: PostShow,
                        },
                    ]}
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

export function links() {
    return [{ rel: "stylesheet", href: resetStyle }];
}
