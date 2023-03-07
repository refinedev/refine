import { ErrorComponent, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostList, PostCreate, PostEdit } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                auditLogProvider={{
                    get: async ({ resource, meta }) => {
                        const { data } = await dataProvider(API_URL).getList({
                            resource: "logs",
                            filters: [
                                {
                                    field: "resource",
                                    operator: "eq",
                                    value: resource,
                                },
                                {
                                    field: "meta.id",
                                    operator: "eq",
                                    value: meta?.id,
                                },
                            ],
                        });

                        return data;
                    },
                    create: (params) => {
                        return dataProvider(API_URL).create({
                            resource: "logs",
                            variables: params,
                        });
                    },
                    update: async ({ id, name }) => {
                        const { data } = await dataProvider(API_URL).update({
                            resource: "logs",
                            id,
                            variables: { name },
                        });
                        return data;
                    },
                }}
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                        meta: {
                            canDelete: true,
                        },
                    },
                ]}
            >
                <Routes>
                    <Route element={<Outlet />}>
                        <Route
                            index
                            element={<NavigateToResource resource="posts" />}
                        />

                        <Route path="/posts" element={<PostList />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                        <Route path="/posts/edit/:id" element={<PostEdit />} />

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
