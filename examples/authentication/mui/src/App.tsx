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
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.providerName === "google") {
                return Promise.resolve(
                    "https://accounts.google.com/o/oauth2/v2/auth",
                );
            }
            if (params.providerName === "github") {
                return Promise.resolve("https://github.com/login");
            }

            localStorage.setItem("email", params.email);
            return Promise.resolve();
        },
        register: (params: any) => {
            localStorage.setItem("email", params.email);
            return Promise.resolve();
        },
        updatePassword: () => {
            return Promise.resolve();
        },
        resetPassword: () => {
            return Promise.resolve();
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
                            {
                                path: "/register",
                                element: <AuthPage type="register" />,
                            },
                            {
                                path: "/reset-password",
                                element: <AuthPage type="resetPassword" />,
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
                    LoginPage={AuthPage}
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
