import { Refine, AuthBindings } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import axios from "axios";

import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { useKeycloak } from "@react-keycloak/web";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    const authProvider: AuthBindings = {
        login: async () => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const { to } = Object.fromEntries(urlSearchParams.entries());
            await keycloak.login({
                redirectUri: to ? `${window.location.origin}${to}` : undefined,
            });
            return Promise.resolve({
                success: false,
                error: new Error("Login failed"),
            });
        },
        logout: async () => {
            await keycloak.logout({
                redirectUri: window.location.origin,
            });
            return Promise.resolve({
                success: true,
            });
        },
        onError: () => Promise.resolve({}),
        check: async () => {
            try {
                const { token } = keycloak;
                if (token) {
                    axios.defaults.headers.common = {
                        Authorization: `Bearer ${token}`,
                    };
                    return Promise.resolve({
                        authenticated: true,
                    });
                } else {
                    return Promise.resolve({
                        authenticated: false,
                        logout: true,
                        redirectTo: "/login",
                        error: new Error("Token not found"),
                    });
                }
            } catch (error) {
                return Promise.resolve({
                    authenticated: false,
                    logout: true,
                    redirectTo: "/login",
                    error: new Error("Token not found"),
                });
            }
        },
        getPermissions: () => Promise.resolve(),
        getIdentity: async () => {
            if (keycloak?.tokenParsed) {
                return Promise.resolve({
                    name: keycloak.tokenParsed.family_name,
                });
            }
            return Promise.resolve({});
        },
    };

    return (
        <Refine
            LoginPage={Login}
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL, axios)}
            routerProvider={routerProvider}
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
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
