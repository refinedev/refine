import { Refine } from "@refinedev/core";
import { QueryClient } from "@tanstack/react-query";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import "./App.css";

import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { PostList, PostCreate, PostEdit } from "pages/posts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
});

const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
});
// const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
});

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            legacyRouterProvider={routerProvider}
            options={{
                reactQuery: {
                    clientConfig: queryClient,
                },
            }}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                },
            ]}
        />
    );
};

export default App;
