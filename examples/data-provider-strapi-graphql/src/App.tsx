import { LegacyAuthProvider as AuthProvider, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider, { GraphQLClient } from "@refinedev/strapi-graphql";
import routerProvider from "@refinedev/react-router-v6";

import "@refinedev/antd";

import { Login } from "pages/login";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "post",
                meta: {
                    operation: "login",
                    variables: {
                        input: {
                            value: { identifier: email, password },
                            type: "UsersPermissionsLoginInput",
                            required: true,
                        },
                    },
                    fields: ["jwt"],
                },
            });

            localStorage.setItem("token", data.jwt);
            client.setHeader("Authorization", `Bearer ${data.jwt}`);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: async () => {
        localStorage.removeItem("token");
        client.setHeader("Authorization", "");
        return Promise.resolve("/");
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const jwt = localStorage.getItem("token");

        if (!jwt) {
            return Promise.reject();
        }

        client.setHeader("Authorization", `Bearer ${jwt}`);

        return Promise.resolve();
    },
    getPermissions: async () => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "get",
                meta: {
                    operation: "me",
                    fields: [
                        {
                            role: ["name", "description", "type"],
                        },
                    ],
                },
            });
            const { role } = data;

            return Promise.resolve(role);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getUserIdentity: async () => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "get",
                meta: {
                    operation: "me",
                    fields: ["id", "username", "email"],
                },
            });
            const { id, username, email } = data;
            return Promise.resolve({
                id,
                name: username,
                email,
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={gqlDataProvider}
            legacyRouterProvider={routerProvider}
            legacyAuthProvider={authProvider}
            LoginPage={Login}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
