import { Refine, Resource, AuthProvider } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { Header } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const {
        isLoading,
        loginWithRedirect,
        isAuthenticated,
        user,
        logout,
        getIdTokenClaims,
    } = useAuth0();

    if (isLoading) {
        return <span>loading...</span>;
    }

    const authProvider: AuthProvider = {
        login: async () => {
            loginWithRedirect();
            return Promise.resolve();
        },
        logout: async () => {
            logout({ returnTo: window.location.origin });
            return Promise.resolve("/");
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            if (isAuthenticated) {
                return Promise.resolve();
            }

            return Promise.reject();
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            return Promise.resolve(user);
        },
    };

    getIdTokenClaims().then((token) => {
        if (token) {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token.__raw}`,
            };
        }
    });

    return (
        <>
            <Refine
                Header={Header}
                LoginPage={Login}
                authProvider={authProvider}
                dataProvider={dataProvider(API_URL, axios)}
            >
                <Resource
                    name="posts"
                    list={PostList}
                    create={PostCreate}
                    edit={PostEdit}
                    show={PostShow}
                />
            </Refine>
        </>
    );
};

export default App;
