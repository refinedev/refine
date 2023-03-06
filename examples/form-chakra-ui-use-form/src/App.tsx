import { Refine } from "@refinedev/core";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import {
    IconAppWindow,
    IconBrandMercedes,
    IconBrandApple,
    IconCurling,
} from "@tabler/icons";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages";

const DashboardPage = () => {
    return <span>dashboard</span>;
};

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                DashboardPage={DashboardPage}
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                authProvider={{
                    login: async ({ email }) => {
                        localStorage.setItem("email", email);
                        return {
                            redirectTo: "/",
                            success: true,
                        };
                    },
                    register: async (params) => {
                        if (params.email && params.password) {
                            localStorage.setItem("email", params.email);
                            return {
                                redirectTo: "/",
                                success: true,
                            };
                        }

                        return {
                            success: false,
                        };
                    },
                    updatePassword: async (params) => {
                        if (params.newPassword) {
                            //we can update password here
                            return {
                                success: true,
                                redirectTo: "/login",
                            };
                        }

                        return {
                            success: false,
                            error: new Error("New password is not valid"),
                        };
                    },
                    forgotPassword: async (params) => {
                        if (params.email) {
                            //we can send email with forgot password link here
                            return {
                                success: true,
                                redirectTo: "/login",
                            };
                        }

                        return {
                            success: false,
                            error: new Error("Email is not valid"),
                        };
                    },
                    logout: async () => {
                        localStorage.removeItem("email");
                        return {
                            success: true,
                            redirectTo: "/login",
                        };
                    },
                    onError: async () => ({}),
                    check: async () =>
                        localStorage.getItem("email")
                            ? {
                                  authenticated: true,
                              }
                            : {
                                  authenticated: false,
                                  redirectTo: "/login",
                              },
                    getPermissions: async () => ["admin"],
                    getIdentity: async () => ({
                        id: 1,
                        name: "Jane Doe",
                        avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
                    }),
                }}
                resources={[
                    {
                        name: "foo",
                        icon: <IconAppWindow size={20} />,
                    },
                    {
                        parentName: "foo",
                        name: "bar",
                        icon: <IconBrandMercedes size={20} />,
                    },
                    {
                        parentName: "bar",
                        name: "baz",
                        icon: <IconBrandApple size={20} />,
                    },
                    {
                        parentName: "baz",
                        icon: <IconCurling size={20} />,
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
