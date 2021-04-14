import React from "react";
import { Admin, Resource, AuthProvider, ILoginForm } from "readmin";

import { DemoSidebar, useDemoSidebar } from "readmin-demo-sidebar";

import dataProvider from "readmin-nestjsx-crud";
import { useTranslation } from "react-i18next";

import axios from "axios";

import {
    PrizesList,
    PostShow,
    PrizesCreate,
    PrizeEdit,
} from "./components/pages/prizes";

const axiosInstance = axios.create();

const authProvider: AuthProvider = {
    login: async (params: ILoginForm) => {
        const result = await axios.post("/ayna-crud-api/auth/login", {
            username: params.username,
            password: params.password,
        });
        if (result.data.token) {
            localStorage.setItem("token", result.data.token);
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${result.data.token}`,
            };
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        if (localStorage.getItem("token")) {
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    },
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
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider("/ayna-crud-api/admin", axiosInstance)}
            {...adminProps}
        >
            <Resource
                name="prizes"
                list={PrizesList}
                show={PostShow}
                edit={PrizeEdit}
                create={PrizesCreate}
                canDelete
            />
        </Admin>
    );
}

export default App;
