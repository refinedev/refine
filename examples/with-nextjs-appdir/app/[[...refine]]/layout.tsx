"use client";

import React from "react";

import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    AuthPage,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router/legacy-app";
import "@refinedev/antd/dist/reset.css";

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
        <>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={routerProvider.call({ params })}
                legacyAuthProvider={authProvider}
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
        </>
    );
}
