import React from "react";

import {
    Admin,
    Resource,
    AuthProvider,
    Icons,
    JsonGraphqlServer,
} from "readmin";
import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
} from "./components/pages/post";
import { CategoryList, CategoryCreate } from "./components/pages/category";
import { UserList, UserShow } from "./components/pages/user";
import { TagList, TagCreate, TagEdit } from "./components/pages/tag";
import { ImagesList } from "./components/pages/images";
import { FilesList } from "./components/pages/files";
import { DashboardPage } from "./components/pages/dashboard";
import { ReadyPage } from "./components/ready";
import { LoginPage } from "./components/login";

function App() {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
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
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
                avatar:
                    "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={JsonGraphqlServer("/api")}
            loginPage={LoginPage}
            dashboard={DashboardPage}
            ready={ReadyPage}
        >
            <Resource
                name="Posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                canDelete
                options={{ label: "My Posts" }}
            />
        </Admin>
    );
}

export default App;
