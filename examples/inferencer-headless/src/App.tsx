import { ErrorComponent, Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import "./App.css";

import { HeadlessInferencer } from "@refinedev/inferencer/headless";

const App: React.FC = () => {
    return (
        <BrowserRouter>
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
            >
                <Routes>
                    <Route
                        index
                        element={<NavigateToResource resource="samples" />}
                    />
                    <Route path="/samples" element={<HeadlessInferencer />} />
                    <Route
                        path="/samples/create"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/samples/show/:id"
                        element={<HeadlessInferencer />}
                    />

                    <Route
                        path="/categories"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/categories/create"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/categories/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/categories/show/:id"
                        element={<HeadlessInferencer />}
                    />

                    <Route path="/users" element={<HeadlessInferencer />} />
                    <Route
                        path="/users/create"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/users/edit/:id"
                        element={<HeadlessInferencer />}
                    />
                    <Route
                        path="/users/show/:id"
                        element={<HeadlessInferencer />}
                    />

                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
