import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    notificationProvider,
} from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { PostList } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ChakraProvider theme={refineTheme}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider()}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <Layout>
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
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
