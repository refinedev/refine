import { AuthBindings, Refine } from "@refinedev/core";
import {
    notificationProvider,
    Layout,
    AuthPage,
    ErrorComponent,
} from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/nhost";
import { NhostAuthProvider } from "@nhost/react-auth";

import "@refinedev/antd/dist/reset.css";

import { nhost } from "utility";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        const { error } = await nhost.auth.signIn({
            email,
            password,
        });

        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Login Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/",
        };
    },
    logout: async () => {
        const { error } = await nhost.auth.signOut();
        if (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    name: "Login Error",
                },
            };
        }

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.status === 401) {
            nhost.auth.refreshSession();
        }

        return {};
    },
    check: async () => {
        const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
        if (isAuthenticated) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: new Error("Not authenticated"),
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => {
        const user = nhost.auth.getUser();
        if (user) {
            return user.roles;
        }

        return [];
    },
    getIdentity: async () => {
        const user = nhost.auth.getUser();
        if (user) {
            return {
                ...user,
                name: user.displayName,
                avatar: user.avatarUrl,
            };
        }

        return null;
    },
};

const App: React.FC = () => {
    return (
        <NhostAuthProvider nhost={nhost}>
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider(nhost)}
                // Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/
                // liveProvider={liveProvider(gqlWebSocketClient)}
                // options={{ liveMode: "auto" }}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                    {
                        name: "categories",
                        list: CategoriesList,
                        create: CategoriesCreate,
                        edit: CategoriesEdit,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                LoginPage={() => (
                    <AuthPage
                        formProps={{
                            initialValues: {
                                email: "info@refine.dev",
                                password: "demodemo",
                            },
                        }}
                    />
                )}
                catchAll={<ErrorComponent />}
            />
        </NhostAuthProvider>
    );
};

export default App;
