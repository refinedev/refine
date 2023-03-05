import React from "react";
import "./index.css";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/airtable";
import routerProvider from "@refinedev/react-router-v6/legacy";

import { Layout } from "components/Layout";

import { PostList } from "pages/post/list";
import { PostShow } from "pages/post/show";
import { PostCreate } from "pages/post/create";
import { PostEdit } from "pages/post/edit";

function App() {
    const API_TOKEN = "key0uWArSH56JHNJV";
    const BASE_ID = "appez0LgaOVA6SdCO";

    return (
        <Refine
            dataProvider={dataProvider(API_TOKEN, BASE_ID)}
            legacyRouterProvider={routerProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                    create: PostCreate,
                    edit: PostEdit,
                },
            ]}
            Layout={Layout}
        />
    );
}

export default App;
