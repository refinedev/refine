import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MuiInferencer } from "@refinedev/inferencer/mui";
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
            <ThemeProvider theme={RefineThemes.Blue}>
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
                                    <Route index element={<MuiInferencer />} />
                                    <Route
                                        path="create"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MuiInferencer />}
                                    />
                                </Route>

                                <Route path="categories">
                                    <Route index element={<MuiInferencer />} />
                                    <Route
                                        path="create"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MuiInferencer />}
                                    />
                                </Route>

                                <Route path="users">
                                    <Route index element={<MuiInferencer />} />
                                    <Route
                                        path="create"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MuiInferencer />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<MuiInferencer />}
                                    />
                                </Route>

                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
