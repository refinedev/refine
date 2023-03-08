import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
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
                notificationProvider={notificationProvider}
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
                        <Route path="/samples" element={<AntdInferencer />} />
                        <Route
                            path="/samples/create"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/samples/edit/:id"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/samples/show/:id"
                            element={<AntdInferencer />}
                        />

                        <Route
                            path="/categories"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/categories/create"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/categories/edit/:id"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/categories/show/:id"
                            element={<AntdInferencer />}
                        />

                        <Route path="/users" element={<AntdInferencer />} />
                        <Route
                            path="/users/create"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/users/edit/:id"
                            element={<AntdInferencer />}
                        />
                        <Route
                            path="/users/show/:id"
                            element={<AntdInferencer />}
                        />

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
