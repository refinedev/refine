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

function App() {
    const [adminProps, demoSidebarProps] = useDemoSidebar({
        defaultTitle: "Rea",
        defaultMutationMode: "pessimistic",
    });

    return (
        <Admin dataProvider={dataProvider("/nestjsx-crud-api")} {...adminProps}>
            {/*  <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                canDelete
            /> */}
        </Admin>
    );
}

export default App;
