import { Refine, AuthProvider, Authenticated } from "@pankod/refine-core";
import {
    notificationProvider,
    AuthPage,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

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
            routerProvider={{
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
