import { Admin, Resource, AuthProvider, Authenticated } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { PostReview } from "pages/post-review";

const API_URL = "https://refine-fake-rest.pankod.com";

const AuthenticatedPostReview = () => {
    return (
        <Authenticated>
            <PostReview />
        </Authenticated>
    );
};

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("username");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
    };

    return (
        <Admin
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider}
            routes={[
                {
                    exact: true,
                    component: PostReview,
                    path: "/public-page",
                },
                {
                    exact: true,
                    component: AuthenticatedPostReview,
                    path: "/authenticated-page",
                },
            ]}
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
