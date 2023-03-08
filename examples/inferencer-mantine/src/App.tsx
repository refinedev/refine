import { Refine } from "@refinedev/core";
import {
    Layout,
    ErrorComponent,
    notificationProvider,
    LightTheme,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/styles";
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
                                        <NavigateToResource resource="samples" />
                                    }
                                />
                                <Route
                                    path="/samples"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/samples/create"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/samples/edit/:id"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/samples/show/:id"
                                    element={<MantineInferencer />}
                                />

                                <Route
                                    path="/categories"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/categories/create"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/categories/edit/:id"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/categories/show/:id"
                                    element={<MantineInferencer />}
                                />

                                <Route
                                    path="/users"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/users/create"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/users/edit/:id"
                                    element={<MantineInferencer />}
                                />
                                <Route
                                    path="/users/show/:id"
                                    element={<MantineInferencer />}
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
