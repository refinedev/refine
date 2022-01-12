import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import { ToastContainer } from "react-toastify";

import {
    Layout,
    Header,
    Sider,
    Title,
    ErrorComponent,
    ReadyPage,
    LoginPage,
} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";
import "react-toastify/dist/ReactToastify.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { notificationProvider } from "notificationProvider";

const API_URL = "https://api.fake-rest.refine.dev";
const mockUsers = [
    {
        username: "admin",
        roles: ["admin"],
    },
    {
        username: "editor",
        roles: ["editor"],
    },
];

const App: React.FC = () => {
    return (
        <>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                authProvider={{
                    login: ({ username, password, remember }) => {
                        // Suppose we actually send a request to the back end here.
                        const user = mockUsers.find(
                            (item) => item.username === username,
                        );

                        if (user) {
                            localStorage.setItem("auth", JSON.stringify(user));
                            return Promise.resolve();
                        }

                        return Promise.reject();
                    },
                    logout: () => {
                        localStorage.removeItem("auth");
                        return Promise.resolve();
                    },
                    checkError: (error) => {
                        if (error && error.statusCode === 401) {
                            return Promise.reject();
                        }

                        return Promise.resolve();
                    },
                    checkAuth: () =>
                        localStorage.getItem("auth")
                            ? Promise.resolve()
                            : Promise.reject(),
                    getPermissions: () => {
                        const auth = localStorage.getItem("auth");
                        if (auth) {
                            const parsedUser = JSON.parse(auth);
                            return Promise.resolve(parsedUser.roles);
                        }
                        return Promise.reject();
                    },
                    getUserIdentity: () => {
                        const auth = localStorage.getItem("auth");
                        if (auth) {
                            const parsedUser = JSON.parse(auth);
                            return Promise.resolve(parsedUser.username);
                        }
                        return Promise.reject();
                    },
                }}
                notificationProvider={notificationProvider}
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
                warnWhenUnsavedChanges={true}
                mutationMode="undoable"
                Layout={Layout}
                Header={Header}
                Title={Title}
                Sider={Sider}
                // catchAll={<ErrorComponent />}
                // ReadyPage={ReadyPage}
                // LoginPage={LoginPage}
            />
            <ToastContainer />
        </>
    );
};

export default App;
