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
import { DemoSidebar, useDemoSidebar } from "readmin-demo-sidebar";

import dataProvider from "readmin-nestjsx-crud";
import { useTranslation } from "react-i18next";

import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
} from "./components/pages/post";
import { CategoryList, CategoryCreate } from "./components/pages/category";
import { UserList, UserEdit, UserCreate } from "./components/pages/user";
import { TagsList, TagsCreate } from "./components/pages/tags";
import { DashboardPage } from "./components/pages/dashboard";
import { ReadyPage } from "./components/ready";
import { LoginPage } from "./components/login";

function App() {
    const [adminProps, demoSidebarProps] = useDemoSidebar({
        defaultTitle: "Readmin",
        defaultMutationMode: "pessimistic",
    });

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
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    const CustomPage = () => {
        return <div>anon and authenticated custom page</div>;
    };

    const AuthenticatedCustomPage = () => {
        return (
            <Authenticated>
                <div>authenticated custom page</div>
            </Authenticated>
        );
    };

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={dataProvider(
                "https://readmin-nestjs-crud.pankod.com",
            )}
            loginPage={LoginPage}
            dashboard={DashboardPage}
            ready={ReadyPage}
            i18nProvider={i18nProvider}
            syncWithLocation
            components={
                <>
                    <BackTop />
                    <DemoSidebar {...demoSidebarProps} />
                </>
            }
            routes={[
                {
                    exact: true,
                    component: CustomPage,
                    path: "/custom",
                },
                {
                    exact: true,
                    component: AuthenticatedCustomPage,
                    path: "/customauth",
                },
            ]}
            configProviderProps={{
                ...defaultConfigProviderProps,
            }}
            {...adminProps}
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
                icon={<Icons.UserOutlined />}
            />
            <Resource
                name="tags"
                list={TagsList}
                // edit={UserEdit}
                create={TagsCreate}
                icon={<Icons.TagsOutlined />}
            />
        </Admin>
    );
}

export default App;
