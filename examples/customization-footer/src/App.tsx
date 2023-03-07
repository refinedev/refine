import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import "@refinedev/antd";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            legacyRouterProvider={routerProvider}
            Footer={() => (
                <div
                    style={{
                        backgroundColor: "white",
                        height: "64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Custom Footer Content
                </div>
            )}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
