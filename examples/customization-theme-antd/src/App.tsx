import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
    ConfigProvider,
    theme,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

import "@pankod/refine-antd/dist/reset.css";

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
            <Refine
                dataProvider={dataProvider(API_URL)}
                routerProvider={routerProvider}
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
