import React from "react";
import {
    Admin,
    Resource,
    AuthProvider,
    Icons,
    Authenticated,
    defaultConfigProviderProps,
    BackTop,
} from "readmin";
import JsonServer from "readmin-json-server";
import { DemoSidebar, useDemoSidebar } from "readmin-demo-sidebar";

import dataProvider from "readmin-nestjsx-crud";
import { useTranslation } from "react-i18next";

import axios from "axios"

import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
} from "./components/pages/post";
import { CategoryList, CategoryCreate } from "./components/pages/category";
import { UserList, UserEdit, UserCreate } from "./components/pages/user";
import { TagList, TagCreate, TagEdit } from "./components/pages/tag";
import { DashboardPage } from "./components/pages/dashboard";
import { ReadyPage } from "./components/ready";
import { LoginPage } from "./components/login";

const axiosInstance = axios.create()

const authProvider: AuthProvider = {
    login: (params: any) => {
        if (params.username === "admin") {
            axiosInstance.defaults.headers = {
                Authorization: "Bearer 'myspecialpassword'",
            }
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


function App() {
    const [adminProps, demoSidebarProps] = useDemoSidebar({
        defaultTitle: "Rea",
        defaultMutationMode: "pessimistic",
    });

    return (
        <Admin dataProvider={dataProvider("https://api.turkcell-ayna-ayna.puul.tv/", axiosInstance)} {...adminProps}>
             <Resource
                name="prizes"
                list={PostList}
                show={PostShow}
                canDelete
            />
        </Admin>
    );
}

export default App;
