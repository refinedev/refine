import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { BasicDataGrid } from "pages/dataGrid";
import { PostList } from "pages/table";

const API_URL = "https://api.fake-rest.refine.dev";

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
                        dataProvider={dataProvider(API_URL)}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "blog_posts",
                            },
                            {
                                name: "blog_posts",
                                list: "/blog-posts/react-table",
                                identifier: "react-table",
                                meta: {
                                    parent: "blog_posts",
                                    label: "React Table",
                                },
                            },
                            {
                                name: "blog_posts",
                                list: "/blog-posts/data-grid",
                                identifier: "data-grid",
                                meta: {
                                    parent: "blog_posts",
                                    label: "Data Grid",
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
                                        <NavigateToResource resource="react-table" />
                                    }
                                />
                                <Route path="blog_posts">
                                    <Route
                                        path="react-table"
                                        element={<PostList />}
                                    />
                                    <Route
                                        path="data-grid"
                                        element={<BasicDataGrid />}
                                    />
                                </Route>

                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
