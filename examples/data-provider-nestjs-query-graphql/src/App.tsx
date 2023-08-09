import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider, {
    GraphQLClient,
    liveProvider,
} from "@refinedev/nestjs-query-graphql";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { createClient } from "graphql-ws";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "./pages/categories";
import { ConfigProvider } from "antd";

const API_URL = "http://localhost:3003/graphql";
const WS_URL = "ws://localhost:3003/graphql";

/*
## Refine supports GraphQL subscriptions out-of-the-box. For more detailed information, please visit here: https://refine.dev/docs/core/providers/live-provider/

const WS_URL = "ws://flowing-mammal-24.hasura.app/v1/graphql";

const gqlWebSocketClient = graphqlWS.createClient({
    url: WS_URL,
});
 */

const client = new GraphQLClient(API_URL);

const gqlDataProvider = dataProvider(client);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={gqlDataProvider}
                    liveProvider={liveProvider(createClient({ url: WS_URL }))}
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog_posts",
                            create: "/blog_posts/create",
                            edit: "/blog_posts/edit/:id",
                            show: "/blog_posts/show/:id",
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
                        liveMode: "auto",
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
                                    <NavigateToResource resource="blog_posts" />
                                }
                            />

                            <Route path="/blog_posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route>

                            <Route path="/categories">
                                <Route index element={<CategoryList />} />
                                <Route
                                    path="create"
                                    element={<CategoryCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<CategoryEdit />}
                                />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
