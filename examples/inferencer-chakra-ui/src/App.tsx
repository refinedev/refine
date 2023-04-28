import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ChakraProvider theme={RefineThemes.Blue}>
                <Refine
                    notificationProvider={notificationProvider()}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    resources={[
                        {
                            name: "samples",
                            list: "/samples",
                            create: "/samples/create",
                            edit: "/samples/edit/:id",
                            show: "/samples/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            create: "/categories/create",
                            edit: "/categories/edit/:id",
                            show: "/categories/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                        {
                            name: "users",
                            list: "/users",
                            create: "/users/create",
                            edit: "/users/edit/:id",
                            show: "/users/show/:id",
                            meta: {
                                canDelete: true,
                            },
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
                                    <NavigateToResource resource="samples" />
                                }
                            />

                            <Route path="samples">
                                <Route index element={<ChakraUIInferencer />} />
                                <Route
                                    path="create"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<ChakraUIInferencer />}
                                />
                            </Route>

                            <Route path="categories">
                                <Route index element={<ChakraUIInferencer />} />
                                <Route
                                    path="create"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<ChakraUIInferencer />}
                                />
                            </Route>

                            <Route path="users">
                                <Route index element={<ChakraUIInferencer />} />
                                <Route
                                    path="create"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ChakraUIInferencer />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<ChakraUIInferencer />}
                                />
                            </Route>

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
