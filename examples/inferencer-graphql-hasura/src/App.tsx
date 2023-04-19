import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider, { GraphQLClient } from "@refinedev/hasura";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { ConfigProvider } from "antd";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
    headers: {
        "x-hasura-role": "public",
    },
});

const gqlDataProvider = dataProvider(client);

/**
 * This `meta` object is used to define the necessary metadata for inferencer to work with.
 *
 * They will be used to infer the fields of the response of the data provider.
 * Also they will be included in the generated code, making them easily editable after you generate the boilerplate code for your resource.
 */
const inferencerPredefinedMeta = {
    posts: {
        getList: {
            fields: [
                "id",
                "title",
                {
                    category: ["id", "title"],
                },
                "category_id",
                "content",
                "created_at",
            ],
        },
        getOne: {
            fields: ["id", "title", "content", "category_id"],
        },
    },
    categories: {
        getList: {
            fields: ["id", "title", "created_at"],
        },
        default: {
            fields: ["id", "title"],
        },
    },
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={gqlDataProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            show: "/posts/show/:id",
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            create: "/categories/create",
                            edit: "/categories/edit/:id",
                        },
                    ]}
                    notificationProvider={notificationProvider}
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
                                    <NavigateToResource resource="posts" />
                                }
                            />

                            <Route path="/posts">
                                <Route
                                    index
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                                <Route
                                    path="create"
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                                <Route
                                    path="edit/:id"
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                                <Route
                                    path="show/:id"
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                            </Route>

                            <Route path="/categories">
                                <Route
                                    index
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                                <Route
                                    path="create"
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                                <Route
                                    path="edit/:id"
                                    element={
                                        <AntdInferencer
                                            meta={inferencerPredefinedMeta}
                                        />
                                    }
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
