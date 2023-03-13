import { GitHubBanner, Refine } from "@refinedev/core";
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
            <GitHubBanner />
            <Refine
                DashboardPage={DashboardPage}
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                legacyAuthProvider={{
                    login: async ({ email, providerName }) => {
                        localStorage.setItem("email", email);
                        return Promise.resolve();
                    },
                    register: (params) => {
                        if (params.email && params.password) {
                            localStorage.setItem("email", params.email);
                            return Promise.resolve();
                        }
                        return Promise.reject();
                    },
                    updatePassword: (params) => {
                        if (params.newPassword) {
                            //we can update password here
                            return Promise.resolve();
                        }
                        return Promise.reject();
                    },
                    forgotPassword: (params) => {
                        if (params.email) {
                            //we can send email with forgot password link here
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
                    getUserIdentity: () =>
                        Promise.resolve({
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
