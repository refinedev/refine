import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    useNotificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import {
    AdminMovieList,
    AdminMovieCreate,
    AdminMovieShow,
    AdminMovieEdit,
} from "./pages/admin/movies";
import { MoviesList, MovieShow } from "./pages/movies";
import { Login } from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        dataProvider={dataProvider(supabaseClient)}
                        authProvider={authProvider}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "movies",
                                list: "/admin/movies",
                                create: "/admin/movies/create",
                                show: "/admin/movies/show/:id",
                                edit: "/admin/movies/edit/:id",
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="movies" />
                                    }
                                />

                                <Route path="admin">
                                    <Route path="movies">
                                        <Route
                                            index
                                            element={<AdminMovieList />}
                                        />
                                        <Route
                                            path="create"
                                            element={<AdminMovieCreate />}
                                        />
                                        <Route
                                            path="show/:id"
                                            element={<AdminMovieShow />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<AdminMovieEdit />}
                                        />
                                    </Route>
                                </Route>
                            </Route>

                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="posts" />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<Login />} />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
