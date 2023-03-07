import {
    Refine,
    LegacyAuthProvider as AuthProvider,
    Authenticated,
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
    const authProvider: AuthProvider = {
        login: ({ email }) => {
            if (email) {
                localStorage.setItem("email", email);
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
            legacyAuthProvider={authProvider}
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
