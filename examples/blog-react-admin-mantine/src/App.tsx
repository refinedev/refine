import React from "react";

import { Refine } from "@refinedev/core";
import { MantineInferencer } from "@refinedev/inferencer";

import {
    notificationProvider,
    Layout,
    LightTheme,
    ReadyPage,
    ErrorComponent,
    AuthPage,
} from "@refinedev/mantine";

import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider from "@refinedev/react-router-v6";

import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";

import { PostList, PostCreate, PostEdit } from "./pages/posts";

function App() {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    legacyAuthProvider={authProvider}
                    dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    LoginPage={AuthPage}
                    legacyRouterProvider={routerProvider}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                            edit: PostEdit,
                            canDelete: true,
                        },
                        {
                            name: "categories",
                            list: MantineInferencer,
                            create: MantineInferencer,
                            show: MantineInferencer,
                            edit: MantineInferencer,
                            canDelete: true,
                        },
                    ]}
                    options={{
                        mutationMode: "optimistic",
                        syncWithLocation: true,
                    }}
                />
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;
