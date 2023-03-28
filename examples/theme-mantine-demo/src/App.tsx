import { useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayout,
    ErrorComponent,
    notificationProvider,
    AuthPage,
    RefineThemes,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import {
    MantineProvider,
    Global,
    ColorScheme,
    ColorSchemeProvider,
} from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { IconBrandGoogle, IconBrandGithub, IconDashboard } from "@tabler/icons";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { authProvider } from "./authProvider";
import ThemeSettings from "./components/theme-settings";
import DashboardPage from "./pages/dashboard";

const App: React.FC = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const [customTheme, setCustomTheme] = useState(RefineThemes.Blue);

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
                        colorScheme: colorScheme,
                        ...customTheme,
                    }}
                    withNormalizeCSS
                    withGlobalStyles
                >
                    <Global
                        styles={{ body: { WebkitFontSmoothing: "auto" } }}
                    />
                    <NotificationsProvider position="top-right">
                        <Refine
                            routerProvider={routerProvider}
                            authProvider={authProvider}
                            dataProvider={dataProvider(
                                "https://api.fake-rest.refine.dev",
                            )}
                            notificationProvider={notificationProvider}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        label: "Dashboard",
                                        icon: <IconDashboard size={20} />,
                                    },
                                },
                                {
                                    name: "Multi Level",
                                    meta: {
                                        label: "Multi Level",
                                    },
                                },
                                {
                                    name: "posts",
                                    list: "/posts",
                                    show: "/posts/show/:id",
                                    create: "/posts/create",
                                    edit: "/posts/edit/:id",
                                },
                                {
                                    name: "posts",
                                    list: "/posts",
                                    show: "/posts/show/:id",
                                    create: "/posts/create",
                                    edit: "/posts/edit/:id",
                                },
                                {
                                    name: "Demo 1",
                                    list: "/demo1",
                                    meta: {
                                        label: "Demo 1",
                                        parent: "Multi Level",
                                    },
                                },
                                {
                                    name: "Demo 2",
                                    list: "/demo2",
                                    meta: {
                                        label: "Demo 2",
                                        parent: "Multi Level",
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
                                        <Authenticated
                                            fallback={
                                                <CatchAllNavigate to="/login" />
                                            }
                                        >
                                            <ThemedLayout>
                                                <Outlet />
                                            </ThemedLayout>
                                        </Authenticated>
                                    }
                                >
                                    <Route index element={<DashboardPage />} />

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
                                </Route>

                                <Route
                                    element={
                                        <Authenticated fallback={<Outlet />}>
                                            <NavigateToResource resource="posts" />
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="/login"
                                        element={
                                            <AuthPage
                                                type="login"
                                                providers={[
                                                    {
                                                        name: "google",
                                                        label: "Sign in with Google",
                                                        icon: (
                                                            <IconBrandGoogle size="16px" />
                                                        ),
                                                    },
                                                    {
                                                        name: "github",
                                                        label: "Sign in with GitHub",
                                                        icon: (
                                                            <IconBrandGithub size="16px" />
                                                        ),
                                                    },
                                                ]}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/register"
                                        element={
                                            <AuthPage
                                                type="register"
                                                providers={[
                                                    {
                                                        name: "google",
                                                        label: "Sign in with Google",
                                                        icon: (
                                                            <IconBrandGoogle size="16px" />
                                                        ),
                                                    },
                                                    {
                                                        name: "github",
                                                        label: "Sign in with GitHub",
                                                        icon: (
                                                            <IconBrandGithub size="16px" />
                                                        ),
                                                    },
                                                ]}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/forgot-password"
                                        element={
                                            <AuthPage type="forgotPassword" />
                                        }
                                    />
                                    <Route
                                        path="/update-password"
                                        element={
                                            <AuthPage type="updatePassword" />
                                        }
                                    />
                                </Route>

                                <Route
                                    element={
                                        <Authenticated>
                                            <ThemedLayout>
                                                <Outlet />
                                            </ThemedLayout>
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Route>
                            </Routes>
                            <UnsavedChangesNotifier />
                        </Refine>
                        <ThemeSettings
                            onThemeClick={(theme) => setCustomTheme(theme)}
                        />
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </BrowserRouter>
    );
};

export default App;
