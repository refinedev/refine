import {
    Refine,
    LegacyAuthProvider as AuthProvider,
    Authenticated,
    AuthBindings,
} from "@refinedev/core";
import {
    notificationProvider,
    AuthPage,
    Layout,
    ErrorComponent,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { PostReview } from "pages/post-review";

const API_URL = "https://api.fake-rest.refine.dev";

const AuthenticatedPostReview = () => {
    return (
        <Authenticated>
            <PostReview />
        </Authenticated>
    );
};

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ email }) => {
            if (email) {
                localStorage.setItem("email", email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                message: "Invalid email or password",
            };
        },
        logout: async () => {
            localStorage.removeItem("email");
            return { redirectTo: "/login", success: true };
        },
        onError: async () => ({}),
        check: async () =>
            localStorage.getItem("email")
                ? {
                      authenticated: true,
                  }
                : {
                      authenticated: false,
                      redirectTo: "/login",
                  },
        getPermissions: async () => ["admin"],
    };

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            legacyRouterProvider={{
                ...routerProvider,
                routes: [
                    {
                        element: <PostReview />,
                        path: "/public-page",
                    },
                    {
                        element: <AuthenticatedPostReview />,
                        path: "/authenticated-page",
                        layout: true,
                    },
                ] as typeof routerProvider.routes,
            }}
            authProvider={authProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            LoginPage={() => (
                <AuthPage
                    formProps={{
                        initialValues: {
                            email: "admin@refine.dev",
                            password: "password",
                        },
                    }}
                />
            )}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
