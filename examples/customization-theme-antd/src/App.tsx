import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

import "@refinedev/antd/dist/reset.css";

import Header from "components/Header";
import { useState } from "react";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

    return (
        <BrowserRouter>
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
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                        },
                    ]}
                    notificationProvider={notificationProvider}
                >
                    <Routes>
                        <Route
                            element={
                                <Layout
                                    Header={() => (
                                        <Header
                                            theme={currentTheme}
                                            setTheme={setCurrentTheme}
                                        />
                                    )}
                                >
                                    <Outlet />
                                </Layout>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />
                            <Route path="/posts" element={<PostList />} />
                            <Route
                                path="/posts/show/:id"
                                element={<PostShow />}
                            />
                            <Route
                                path="/posts/create"
                                element={<PostCreate />}
                            />
                            <Route
                                path="/posts/edit/:id"
                                element={<PostEdit />}
                            />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
