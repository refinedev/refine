import { useEffect, useState } from "react";
import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { useSdk, withCloud } from "@pankod/refine-cloud";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

// temporary set for refine-cluod-dev-tools
window.localStorage.setItem(
    "refine-cloud-token",
    process.env.REACT_APP_REFINE_CLOUD_TOKEN as string,
);

const RefineWithCloud = withCloud(Refine, {
    baseUrl: process.env.REACT_APP_REFINE_BASE_URL as string,
    clientId: process.env.REACT_APP_REFINE_CLIENT_ID as string,
    resourcesName: "development",
});

const Dashboard = () => {
    const { sdk } = useSdk();
    const [users, setUsers] = useState();

    useEffect(() => {
        console.log("--req");
        sdk.cloudQuery
            .run({
                key: "postgresql-users",
            })
            .then((users) => {
                setUsers(users);
            })
            .catch((err) => console.log("err", err));
    }, []);

    return (
        <pre>
            <code>{JSON.stringify(users, null, 2)}</code>
        </pre>
    );
};

const App: React.FC = () => {
    return (
        <RefineWithCloud
            DashboardPage={Dashboard}
            LoginPage={Login}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            disableTelemetry={true}
        />
    );
};

export default App;
