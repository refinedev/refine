import { Admin, Resource, AuthProvider, Spin } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";
import { useAuth0 } from "@auth0/auth0-react";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    const { isLoading, isAuthenticated, user, logout } = useAuth0();

    console.log("isLoading", isLoading);
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);

    if (isLoading) {
        return <span>loading...</span>;
    }

    const authProvider: AuthProvider = {
        login: async () => {
            return Promise.resolve();
        },
        logout: async () => {
            logout();

            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            if (isAuthenticated) {
                return Promise.resolve();
            }

            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => user,
    };

    return (
        <>
            <Admin
                LoginPage={Login}
                authProvider={authProvider}
                dataProvider={dataProvider(API_URL)}
            >
                <Resource
                    name="posts"
                    list={PostList}
                    create={PostCreate}
                    edit={PostEdit}
                    show={PostShow}
                />
            </Admin>
        </>
    );
};

export default App;
