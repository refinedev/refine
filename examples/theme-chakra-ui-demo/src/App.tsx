import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    AuthPage,
    ThemedLayout,
    ErrorComponent,
    notificationProvider,
    RefineThemes,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { IconBrandGoogle, IconBrandGithub, IconDashboard } from "@tabler/icons";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import DashboardPage from "./pages/dashboard";
import { authProvider } from "./authProvider";
import { useState } from "react";
import { ThemeSettings } from "./components/theme-settings";

const CustomLayout = ThemedLayout;

const App: React.FC = () => {
    const [customTheme, setCustomTheme] = useState(RefineThemes.Magenta);

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ChakraProvider theme={customTheme}>
                <ThemeSettings onColorClick={setCustomTheme} />
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    notificationProvider={notificationProvider()}
                    resources={[
                        {
                            name: "dashboard",
                            list: "/",
                            meta: {
                                label: "Dashboard",
                                icon: <IconDashboard size={16} />,
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
                            meta: {
                                canDelete: true,
                            },
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
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <CustomLayout>
                                        <Outlet />
                                    </CustomLayout>
                                </Authenticated>
                            }
                        >
                            <Route index element={<DashboardPage />} />

                            <Route path="/posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
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
                                                icon: <IconBrandGoogle />,
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: <IconBrandGithub />,
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
                                                icon: <IconBrandGoogle />,
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: <IconBrandGithub />,
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated>
                                    <CustomLayout>
                                        <Outlet />
                                    </CustomLayout>
                                </Authenticated>
                            }
                        >
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
