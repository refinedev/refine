import React from "react";
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { postList, categoryList, userList, eventList } from "pages";
import { Layout } from "components/Layout";

import "App.css";
import "index.css";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                { name: "posts", list: postList },
                { name: "categories", list: categoryList },
                { name: "users", list: userList },
                { name: "events", list: eventList },
            ]}
            Layout={Layout}
        />
    );
};

export default App;
