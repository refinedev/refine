import React from "react";
import { GitHubBanner, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    ChakraProvider,
    refineTheme,
    ReadyPage,
    ErrorComponent,
    Layout,
    AuthPage,
} from "@pankod/refine-chakra-ui";
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router-v6";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

function App() {
    return (
        <ChakraProvider theme={refineTheme}>
            <GitHubBanner />
            <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={notificationProvider()}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Layout={Layout}
                routerProvider={routerProvider}
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
