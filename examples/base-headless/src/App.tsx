import {
    GitHubBanner,
    Refine,
    ErrorComponent,
    DataProvider,
} from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostList, PostCreate, PostEdit } from "./pages/posts";

import "./App.css";

export const dataProvider2 = (url: string): DataProvider => ({
    getOne: async () => {
        throw new Error("Not implemented");
    },

    getMany: async ({ ids, resource }) => {
        // converting array to query-string (eg. [1,2,3] => id=1&id=2&id=3)
        const idQuery = ids.map((id) => `id=${id}`).join("&");
        const response = await fetch(`${url}/${resource}?${idQuery}`);
        const data = await response.json();

        return {
            data,
        };
    },

    create: async () => {
        throw new Error("Not implemented");
    },
    update: async () => {
        throw new Error("Not implemented");
    },
    deleteOne: async () => {
        throw new Error("Not implemented");
    },
    getList: async () => {
        throw new Error("Not implemented");
    },
    getApiUrl: () => url,
});

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={{
                    ...dataProvider("https://api.fake-rest.refine.dev"),
                    update: async ({ resource, id, variables }) => {
                        const response = await fetch(
                            `https://api.fake-rest.refine.dev/${resource}/${id}`,
                            {
                                method: "PATCH",
                                body: JSON.stringify(variables),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            },
                        );
                        const data = await response.json();

                        return {
                            data,
                        };
                    },
                }}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    },
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        index
                        element={<NavigateToResource resource="products" />}
                    />

                    <Route path="/products">
                        <Route index element={<PostList />} />
                        <Route path="create" element={<PostCreate />} />
                        <Route path="edit/:id" element={<PostEdit />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
