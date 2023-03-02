import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";
import "@pankod/refine-antd/dist/reset.css";

import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "../src/constants";

import { PostList, PostCreate, PostEdit, PostShow } from "@components";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                { name: "users" },
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            options={{ syncWithLocation: true }}
            notificationProvider={notificationProvider}
            /**
             * `LoginPage` property is used to render `/login` page, which is the redirect path for unauthenticated users.
             * Other auth pages, such as `/register`, `/forgot-password` etc. are not handled by refine.
             * You need to create routes for them based on your router provider.
             * In this example, we've created pages at `/pages` directory for the auth pages.
             * Please check out `/pages/register.tsx`, `/pages/forgot-password.tsx` and `/pages/update-password.tsx` files for more details.
             */
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
            Layout={Layout}
            catchAll={<ErrorComponent />}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
