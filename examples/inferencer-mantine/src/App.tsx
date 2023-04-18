import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    notificationProvider,
    RefineThemes,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/styles";
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "samples",
                                list: "/samples",
                                create: "/samples/create",
                                edit: "/samples/edit/:id",
                                show: "/samples/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: "categories",
                                list: "/categories",
                                create: "/categories/create",
                                edit: "/categories/edit/:id",
                                show: "/categories/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: "users",
                                list: "/users",
                                create: "/users/create",
                                edit: "/users/edit/:id",
                                show: "/users/show/:id",
                                meta: {
                                    canDelete: true,
                                },
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
                                        <NavigateToResource resource="samples" />
                                    }
                                />

                                <Route path="samples">
                                    <Route
                                        index
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="create"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MantineInferencer />}
                                    />
                                </Route>

                                <Route path="categories">
                                    <Route
                                        index
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="create"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MantineInferencer />}
                                    />
                                </Route>

                                <Route path="users">
                                    <Route
                                        index
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="create"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MantineInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MantineInferencer />}
                                    />
                                </Route>

                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
