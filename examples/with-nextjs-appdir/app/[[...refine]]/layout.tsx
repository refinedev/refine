"use client";

import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router/app";
import "@pankod/refine-antd/dist/styles.min.css";

import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "../../src/constants";

import { PostList, PostCreate, PostEdit, PostShow } from "@components";

export default function RefineLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Record<"refine", string[]>;
}) {
    return (
        <Refine
            routerProvider={routerProvider.call({ params })}
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
                { name: "users" },
            ]}
            options={{ syncWithLocation: true }}
            notificationProvider={notificationProvider}
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
            {children}
        </Refine>
    );
}
