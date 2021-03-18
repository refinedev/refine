import React from "react";
import { Admin, Resource, AuthProvider, JsonServer, Icons } from "readmin";
import { useTranslation } from "react-i18next";

import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
} from "./components/pages/post";
import { CategoryList, CategoryCreate } from "./components/pages/category";
import {
    UserList,
    UserShow,
    UserEdit,
    UserCreate,
} from "./components/pages/user";
import { TagList, TagCreate, TagEdit } from "./components/pages/tag";
import { ImagesList } from "./components/pages/images";
import { FilesList } from "./components/pages/files";
import { DashboardPage } from "./components/pages/dashboard";
import { ReadyPage } from "./components/ready";
import { LoginPage } from "./components/login";
import {
    LandingCreate,
    LandingEdit,
    LandingList,
    LandingShow,
} from "./components/pages/landing";
import {
    PostLightCreate,
    PostLightEdit,
    PostLightList,
    PostLightShow,
} from "./components/pages/post-light";

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

    const { t, i18n } = useTranslation(["common", "translation"]);

    const i18nProvider = {
        translate: (key: string, defaultTranslate: string) =>
            t(key, defaultTranslate),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={JsonServer("/api")}
            loginPage={LoginPage}
            dashboard={DashboardPage}
            ready={ReadyPage}
            i18nProvider={i18nProvider}
            mutationMode="undoable"
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                canDelete
            />
            <Resource
                name="posts"
                list={PostLightList}
                create={PostLightCreate}
                edit={PostLightEdit}
                show={PostLightShow}
                options={{ label: "Post Light", route: "post-light" }}
                canDelete
            />
            <Resource
                name="categories"
                list={CategoryList}
                create={CategoryCreate}
                canDelete
            />
            <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                show={UserShow}
                icon={<Icons.UserOutlined />}
            />
            <Resource
                name="tags"
                list={TagList}
                edit={TagEdit}
                create={TagCreate}
                canDelete
            />
            <Resource name="images" list={ImagesList} />
            <Resource name="files" list={FilesList} />
            <Resource
                name="landing"
                list={LandingList}
                show={LandingShow}
                create={LandingCreate}
                edit={LandingEdit}
            />
        </Admin>
    );
}

export default App;
