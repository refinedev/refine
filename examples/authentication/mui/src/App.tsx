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
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
import {
    LoginPage,
    RegisterPage,
    UpdatePasswordPage,
    ResetPasswordPage,
} from "pages/auth";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            console.log(params);

            if (params.providerName === "facebook") {
                return Promise.resolve(
                    "https://www.facebook.com/v2.12/dialog/oauth",
                );
            }
            if (params.providerName === "google") {
                return Promise.resolve(
                    "https://accounts.google.com/o/oauth2/v2/auth",
                );
            }
            if (params.providerName === "github") {
                return Promise.resolve("https://github.com/login");
            }
            if (params.email === "admin@refine.com") {
                localStorage.setItem("email", params.email);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        register: (params: any) => {
            if (params.email && params.password) {
                localStorage.setItem("email", params.email);
                return Promise.resolve();
            }
            return Promise.reject();
        },
        updatePassword: (params: any) => {
            if (params.newPassword) {
                //we can update password here
                return Promise.resolve();
            }
            return Promise.reject();
        },
        resetPassword: (params: any) => {
            if (params.email) {
                //we can send email with reset password link here
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
                            { path: "/register", element: <RegisterPage /> },
                            {
                                path: "/reset-password",
                                element: <ResetPasswordPage />,
                            },
                            {
                                path: "/update-password",
                                element: <UpdatePasswordPage />,
                            },
                        ],
                    }}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    LoginPage={LoginPage}
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
