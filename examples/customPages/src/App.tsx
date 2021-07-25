import {
    Refine,
    Resource,
    AuthProvider,
    Authenticated,
    LayoutWrapper,
} from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { PostReview } from "pages/post-review";

const API_URL = "https://api.fake-rest.refine.dev";

const AuthenticatedPostReview = () => {
    return (
        <Authenticated>
            <LayoutWrapper>
                <PostReview />
            </LayoutWrapper>
        </Authenticated>
    );
};

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: ({ username, password, remember }) => {
            if (username === "admin") {
                localStorage.setItem("username", username);
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
        <Refine
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
        </Refine>
    );
};

export default App;
