import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    notificationProvider,
    RefineThemes,
} from "@refinedev/mantine";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

import { PostCreate, PostEdit, PostList } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <MantineProvider
                theme={RefineThemes.Blue}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(API_URL)}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "posts",
                                list: "/posts",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="posts" />
                                    }
                                />

                                <Route path="/posts">
                                    <Route index element={<PostList />} />
                                    <Route
                                        path="create"
                                        element={<PostCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<PostEdit />}
                                    />
                                </Route>

                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                    <UnsavedChangesNotifier />
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
