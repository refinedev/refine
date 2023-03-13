import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

import "@refinedev/antd/dist/reset.css";

import Header from "components/Header";
import { useState } from "react";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    currentTheme === "light"
                        ? theme.defaultAlgorithm
                        : theme.darkAlgorithm,
                components: {
                    Button: {
                        borderRadius: 0,
                    },
                    Typography: {
                        colorTextHeading: "#1890ff",
                    },
                },
                token: {
                    colorPrimary: "#f0f",
                },
            }}
        >
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_URL)}
                legacyRouterProvider={routerProvider}
                Header={() => (
                    <Header theme={currentTheme} setTheme={setCurrentTheme} />
                )}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                catchAll={<ErrorComponent />}
            />
        </ConfigProvider>
    );
};

export default App;
