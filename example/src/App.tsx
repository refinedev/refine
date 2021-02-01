import React from "react";
import { Admin, Resource, AuthProvider, JsonServer } from "readmin";

import { PostCreate, PostList } from "./post";
import { CategoryList, CategoryCreate, CategoryEdit } from "./category";
import { UserList } from "./user";

const App: React.FC = () => {
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
        getPermissions: () => Promise.reject("Unknown method"),
        userIdentity: () =>
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
            dataProvider={JsonServer("https://readmin-fake-rest.pankod.com")}
        >
            <Resource name="posts" list={PostList} create={PostCreate} />
            <Resource
                name="categories"
                list={CategoryList}
                create={CategoryCreate}
                edit={CategoryEdit}
            />
            <Resource name="users" list={UserList} />
        </Admin>
    );
};

export default App;
