import { Refine } from "@refinedev/core";
import {
    Layout,
    ErrorComponent,
    LightTheme,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={LightTheme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
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
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/samples/create"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/samples/edit/:id"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/samples/show/:id"
                                    element={<MuiInferencer />}
                                />

                                <Route
                                    path="/categories"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/categories/create"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/categories/edit/:id"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/categories/show/:id"
                                    element={<MuiInferencer />}
                                />

                                <Route
                                    path="/users"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/users/create"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/users/edit/:id"
                                    element={<MuiInferencer />}
                                />
                                <Route
                                    path="/users/show/:id"
                                    element={<MuiInferencer />}
                                />

                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
