import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    notificationProvider,
    RefineThemes,
} from "@refinedev/mantine";
import { useLocalStorage } from "@mantine/hooks";
import { ColorSchemeProvider } from "@mantine/styles";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, ColorScheme, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { Header } from "./components";

const App: React.FC = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={{
                        ...RefineThemes.Blue,
                        colorScheme,
                    }}
                    withNormalizeCSS
                    withGlobalStyles
                >
                    <Global
                        styles={{ body: { "-webkit-font-smoothing": "auto" } }}
                    />
                    <NotificationsProvider position="top-right">
                        <Refine
                            routerProvider={routerProvider}
                            dataProvider={dataProvider(
                                "https://api.fake-rest.refine.dev",
                            )}
                            notificationProvider={notificationProvider}
                            resources={[
                                {
                                    name: "posts",
                                    list: "/posts",
                                    show: "/posts/show/:id",
                                    create: "/posts/create",
                                    edit: "/posts/edit/:id",
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
                                        <ThemedLayoutV2 Header={Header}>
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

                                    <Route path="/posts">
                                        <Route index element={<PostList />} />
                                        <Route
                                            path="create"
                                            element={<PostCreate />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<PostEdit />}
                                        />
                                        <Route
                                            path="show/:id"
                                            element={<PostShow />}
                                        />
                                    </Route>

                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Route>
                            </Routes>
                            <UnsavedChangesNotifier />
                        </Refine>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </BrowserRouter>
    );
};

export default App;
