import { Refine } from "@refinedev/core";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ChakraProvider theme={refineTheme}>
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
                                    <NavigateToResource resource="samples" />
                                }
                            />
                            <Route
                                path="/samples"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/samples/create"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/samples/edit/:id"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/samples/show/:id"
                                element={<ChakraUIInferencer />}
                            />

                            <Route
                                path="/categories"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/categories/create"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/categories/edit/:id"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/categories/show/:id"
                                element={<ChakraUIInferencer />}
                            />

                            <Route
                                path="/users"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/users/create"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/users/edit/:id"
                                element={<ChakraUIInferencer />}
                            />
                            <Route
                                path="/users/show/:id"
                                element={<ChakraUIInferencer />}
                            />

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
