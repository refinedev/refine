import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    notificationProvider,
} from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { PostList } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ChakraProvider theme={RefineThemes.Blue}>
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
                            <Route path="/posts" element={<PostList />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
