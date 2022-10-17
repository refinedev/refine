import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    ThemeProvider,
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    AuthPage,
    FormControlLabel,
    Checkbox,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useFormContext } from "@pankod/refine-react-hook-form";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: async ({ providerName, email }) => {
            if (providerName === "google") {
                window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth";
                return Promise.resolve(false);
            }

            if (providerName === "github") {
                window.location.href =
                    "https://github.com/login/oauth/authorize";
                return Promise.resolve(false);
            }

            localStorage.setItem("email", email);
            return Promise.resolve();
        },
        register: (params) => {
            if (params.email && params.password) {
                localStorage.setItem("email", params.email);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        updatePassword: (params) => {
            if (params.newPassword) {
                //we can update password here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        forgotPassword: (params) => {
            if (params.email) {
                //we can send email with forgot password link here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("email");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("email")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                name: "Jane Doe",
                avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    const RememeberMe = () => {
        const { register } = useFormContext();

        return (
            <FormControlLabel
                sx={{
                    span: {
                        fontSize: "12px",
                        color: "text.secondary",
                    },
                }}
                color="secondary"
                control={
                    <Checkbox
                        size="small"
                        id="rememberMe"
                        {...register("rememberMe")}
                    />
                }
                label="Remember me"
            />
        );
    };

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    authProvider={authProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    routerProvider={{
                        ...routerProvider,
                        routes: [
                            {
                                path: "/register",
                                element: (
                                    <AuthPage
                                        type="register"
                                        formProps={{
                                            onSubmit: (formValues) => {
                                                console.log(
                                                    JSON.stringify(
                                                        formValues,
                                                        null,
                                                        2,
                                                    ),
                                                );
                                            },
                                            defaultValues: {
                                                email: "test@mail.com",
                                            },
                                        }}
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: (
                                                    <GoogleIcon
                                                        style={{ fontSize: 24 }}
                                                    />
                                                ),
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: (
                                                    <GitHubIcon
                                                        style={{ fontSize: 24 }}
                                                    />
                                                ),
                                            },
                                        ]}
                                    />
                                ),
                            },
                            {
                                path: "/forgot-password",
                                element: <AuthPage type="forgotPassword" />,
                            },
                            {
                                path: "/update-password",
                                element: <AuthPage type="updatePassword" />,
                            },
                        ],
                    }}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    LoginPage={() => (
                        <AuthPage
                            providers={[
                                {
                                    name: "google",
                                    label: "Sign in with Google",
                                    icon: (
                                        <GoogleIcon style={{ fontSize: 24 }} />
                                    ),
                                },
                                {
                                    name: "github",
                                    label: "Sign in with GitHub",
                                    icon: (
                                        <GitHubIcon style={{ fontSize: 24 }} />
                                    ),
                                },
                            ]}
                            rememberMe={<RememeberMe />}
                        />
                    )}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: PostsList,
                            create: PostCreate,
                            edit: PostEdit,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
