import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";
import "./index.css";

import { PostList } from "pages/posts";
import { CustomSider } from "components";

const { Link } = routerProvider;

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            legacyRouterProvider={routerProvider}
            Sider={CustomSider}
            Title={({ collapsed }) => (
                <Link to="/">
                    {collapsed ? (
                        <img
                            src="/refine-collapsed.svg"
                            alt="Refine"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "12px 24px",
                            }}
                        />
                    ) : (
                        <img
                            src="/refine.svg"
                            alt="Refine"
                            style={{
                                width: "200px",
                                padding: "12px 24px",
                            }}
                        />
                    )}
                </Link>
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
