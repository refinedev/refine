import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import "@refinedev/antd";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";
const CATEGORIES_API_URL = "https://api.fake-rest.refine.dev";
const FINE_FOODS_API_URL = "https://api.finefoods.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={{
                default: dataProvider(API_URL),
                categories: dataProvider(CATEGORIES_API_URL),
                fineFoods: dataProvider(FINE_FOODS_API_URL),
            }}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
                {
                    name: "categories",
                    meta: {
                        dataProviderName: "categories",
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
