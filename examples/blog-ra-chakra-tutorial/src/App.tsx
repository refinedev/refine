import React from "react";
import { Refine } from "@refinedev/core";

import {
    notificationProvider,
    refineTheme,
    ReadyPage,
    ErrorComponent,
    Layout,
    AuthPage,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider from "@refinedev/react-router-v6";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

function App() {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                legacyAuthProvider={authProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={notificationProvider()}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
                legacyRouterProvider={routerProvider}
                LoginPage={AuthPage}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        create: PostCreate,
                        edit: PostEdit,
                        canDelete: true,
                    },
                ]}
                options={{ mutationMode: "undoable" }}
            />
        </ChakraProvider>
    );
}

export default App;
