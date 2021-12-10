import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";
import simpleRestDataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";
import { DashboardPage } from "pages/dashboard";

function App() {
    const API_URL = "https://api.fake-rest.refine.dev";
    const dataProvider = simpleRestDataProvider(API_URL);
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            LoginPage={Login}
            DashboardPage={DashboardPage}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        ></Refine>
    );
}

export default App;
