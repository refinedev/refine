import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

import { Layout } from "components/layout";

import "./App.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
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
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={<NavigateToResource resource="samples" />}
                        />

                        <Route path="samples">
                            <Route index element={<HeadlessInferencer />} />
                            <Route
                                path="create"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="show/:id"
                                element={<HeadlessInferencer />}
                            />
                        </Route>

                        <Route path="categories">
                            <Route index element={<HeadlessInferencer />} />
                            <Route
                                path="create"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="show/:id"
                                element={<HeadlessInferencer />}
                            />
                        </Route>

                        <Route path="users">
                            <Route index element={<HeadlessInferencer />} />
                            <Route
                                path="create"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="show/:id"
                                element={<HeadlessInferencer />}
                            />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
