import { AuthBindings, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider, { GraphQLClient } from "@pankod/refine-strapi-graphql";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import "@pankod/refine-antd/dist/reset.css";

import { Login } from "pages/login";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.strapi.refine.dev/graphql";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "post",
                metaData: {
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

            return Promise.resolve({
                success: true,
                redirectTo: "/",
            });
        } catch (error: any) {
            return Promise.resolve({
                success: false,
                error: new Error(error),
            });
        }
    },
    logout: async () => {
        localStorage.removeItem("token");
        client.setHeader("Authorization", "");
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
    onError: () => Promise.resolve({}),
    check: () => {
        const jwt = localStorage.getItem("token");

        if (!jwt) {
            return Promise.resolve({
                authenticated: false,
                error: new Error("Not authenticated"),
                redirectTo: "/login",
            });
        }

        client.setHeader("Authorization", `Bearer ${jwt}`);

        return Promise.resolve({
            authenticated: true,
        });
    },
    getPermissions: async () => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "get",
                metaData: {
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
            return Promise.resolve(error);
        }
    },
    getIdentity: async () => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "get",
                metaData: {
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
            return Promise.resolve(error);
        }
    },
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={gqlDataProvider}
            routerProvider={routerProvider}
            authProvider={authProvider}
            legacyRouterProvider={routerProvider}
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
