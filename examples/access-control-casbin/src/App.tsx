import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { newEnforcer } from "casbin";
import "@refinedev/antd/dist/reset.css";

import { model, adapter } from "accessControl";
import { Header } from "components/header";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const role = localStorage.getItem("role") ?? "admin";

    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                accessControlProvider={{
                    can: async ({ action, params, resource }) => {
                        const enforcer = await newEnforcer(model, adapter);
                        if (
                            action === "delete" ||
                            action === "edit" ||
                            action === "show"
                        ) {
                            return Promise.resolve({
                                can: await enforcer.enforce(
                                    role,
                                    `${resource}/${params?.id}`,
                                    action,
                                ),
                            });
                        }
                        if (action === "field") {
                            return Promise.resolve({
                                can: await enforcer.enforce(
                                    role,
                                    `${resource}/${params?.field}`,
                                    action,
                                ),
                            });
                        }
                        return Promise.resolve({
                            can: await enforcer.enforce(role, resource, action),
                        });
                    },
                }}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        show: "/posts/show/:id",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                        meta: {
                            canDelete: true,
                        },
                    },
                    {
                        name: "users",
                        list: "/users",
                        show: "/users/show/:id",
                        create: "/users/create",
                        edit: "/users/edit/:id",
                    },
                    {
                        name: "categories",
                        list: "/categories",
                        show: "/categories/show/:id",
                        create: "/categories/create",
                        edit: "/categories/edit/:id",
                    },
                ]}
                notificationProvider={notificationProvider}
            >
                <Routes>
                    <Route
                        element={
                            <Layout Header={() => <Header role={role} />}>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={<NavigateToResource resource="posts" />}
                        />

                        <Route path="/posts" element={<PostList />} />
                        <Route path="/posts/show/:id" element={<PostShow />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                        <Route path="/posts/edit/:id" element={<PostEdit />} />

                        <Route path="/users" element={<UserList />} />
                        <Route path="/users/show/:id" element={<UserShow />} />
                        <Route path="/users/create" element={<UserCreate />} />
                        <Route path="/users/edit/:id" element={<UserEdit />} />

                        <Route path="/posts" element={<CategoryList />} />
                        <Route
                            path="/posts/show/:id"
                            element={<CategoryShow />}
                        />
                        <Route
                            path="/posts/create"
                            element={<CategoryCreate />}
                        />
                        <Route
                            path="/posts/edit/:id"
                            element={<CategoryEdit />}
                        />

                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
