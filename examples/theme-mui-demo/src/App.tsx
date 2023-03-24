import { useState } from "react";
import { Refine, Authenticated, GitHubBanner, useModal } from "@refinedev/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
    ErrorComponent,
    notificationProvider,
    RefineSnackbarProvider,
    AuthPage,
    RefineThemes,
    ThemedLayout,
} from "@refinedev/mui";
import {
    Card,
    CardContent,
    Chip,
    CssBaseline,
    Dialog,
    DialogTitle,
    Fab,
    GlobalStyles,
    Stack,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import { PostList, PostCreate, PostEdit } from "pages/posts";
import DashboardPage from "pages/dashboard";
import { authProvider } from "authProvider";
import { RememeberMe } from "components/remember-me";

const App: React.FC = () => {
    const [customTheme, setCustomTheme] = useState(RefineThemes.MagentaDark);
    const { show, close, visible } = useModal();

    return (
        <BrowserRouter>
            <ThemeProvider theme={customTheme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        authProvider={authProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        routerProvider={routerProvider}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "dashboard",
                                list: "/",
                                meta: {
                                    label: "Dashboard",
                                    icon: <DashboardIcon />,
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
                                            rememberMe={<RememeberMe />}
                                            providers={[
                                                {
                                                    name: "google",
                                                    label: "Sign in with Google",
                                                    icon: (
                                                        <GoogleIcon
                                                            style={{
                                                                fontSize: 14,
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    name: "github",
                                                    label: "Sign in with GitHub",
                                                    icon: (
                                                        <GitHubIcon
                                                            style={{
                                                                fontSize: 14,
                                                            }}
                                                        />
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
                                            formProps={{
                                                defaultValues: {
                                                    email: "test@example.com",
                                                },
                                            }}
                                            providers={[
                                                {
                                                    name: "google",
                                                    label: "Sign in with Google",
                                                    icon: (
                                                        <GoogleIcon
                                                            style={{
                                                                fontSize: 14,
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    name: "github",
                                                    label: "Sign in with GitHub",
                                                    icon: (
                                                        <GitHubIcon
                                                            style={{
                                                                fontSize: 14,
                                                            }}
                                                        />
                                                    ),
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
                                        <ThemedLayout>
                                            <Outlet />
                                        </ThemedLayout>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>

                    <Fab
                        onClick={show}
                        variant="extended"
                        sx={{
                            position: "fixed",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Open Theme Settings
                    </Fab>
                    <Dialog open={visible} onClose={close}>
                        <DialogTitle>Theme Settings</DialogTitle>
                        <Card>
                            <CardContent>
                                <Stack gap={2} direction="row" flexWrap="wrap">
                                    {Object.keys(RefineThemes).map((name) => {
                                        const theme =
                                            RefineThemes[
                                                name as keyof typeof RefineThemes
                                            ];

                                        return (
                                            <Chip
                                                key={name}
                                                label={name}
                                                onClick={() => {
                                                    setCustomTheme(theme);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette.primary
                                                            .main,
                                                }}
                                            />
                                        );
                                    })}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Dialog>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
