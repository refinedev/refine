import { Refine } from "@refinedev/core";
import {
    Layout,
    ErrorComponent,
    notificationProvider,
    LightTheme,
    DarkTheme,
} from "@refinedev/mantine";
import { useLocalStorage } from "@mantine/hooks";
import { ColorSchemeProvider } from "@mantine/styles";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, ColorScheme, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
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
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    theme={colorScheme === "dark" ? DarkTheme : LightTheme}
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
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Layout Header={Header}>
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
                                    <Route
                                        path="/posts"
                                        element={<PostList />}
                                    />
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
                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Route>
                            </Routes>
                        </Refine>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </BrowserRouter>
    );
};

export default App;
