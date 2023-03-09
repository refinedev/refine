import { Refine } from "@refinedev/core";
import {
    Layout,
    ErrorComponent,
    notificationProvider,
    LightTheme,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MantineProvider
                theme={LightTheme}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "posts",
                                list: "/posts",
                                show: "/posts/show/:id",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                            },
                        ]}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="posts" />
                                    }
                                />
                                <Route path="/posts" element={<PostList />} />
                                <Route
                                    path="/posts/show/:id"
                                    element={<PostShow />}
                                />
                                <Route
                                    path="/posts/create"
                                    element={<PostCreate />}
                                />
                                <Route
                                    path="/posts/edit/:id"
                                    element={<PostEdit />}
                                />
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
