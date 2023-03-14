import React from "react";
import "./index.css";
import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/airtable";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { Layout } from "components/Layout";

import { PostList } from "pages/post/list";
import { PostShow } from "pages/post/show";
import { PostCreate } from "pages/post/create";
import { PostEdit } from "pages/post/edit";

function App() {
    const API_TOKEN = "key0uWArSH56JHNJV";
    const BASE_ID = "appez0LgaOVA6SdCO";

    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_TOKEN, BASE_ID)}
                routerProvider={routerProvider}
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
                            element={<NavigateToResource resource="posts" />}
                        />
                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="show/:id" element={<PostShow />} />
                            <Route path="create" element={<PostCreate />} />
                            <Route path="edit/:id" element={<PostEdit />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
}

export default App;
