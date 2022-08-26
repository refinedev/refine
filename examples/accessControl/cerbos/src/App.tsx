import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { HTTP as Cerbos } from "@cerbos/http";

import "@pankod/refine-antd/dist/styles.min.css";

import { Header } from "components/header";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

// This is making use of the hosted Cerbos Policy Decision Point
// You can view the policies in the Playground https://play.cerbos.dev/p/UWG3inHjwrFhqkv60dec623G9PoYlgJf
// For production we recommend running a PDP container along side your application
// See https://cerbos.dev for more information

// The Cerbos PDP instance
const cerbos = new Cerbos("https://demo-pdp.cerbos.cloud", {
    playgroundInstance: "WS961950bd85QNYlAvTmJYubP0bqF7e3", // The playground instance ID to test
});

const App: React.FC = () => {
    const role = localStorage.getItem("role") ?? "admin";
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
                can: async ({ action, params, resource }) => {
                    const result = await cerbos.checkResource({
                        principal: {
                            id: "demoUser", // Fake a user ID
                            roles: [role],
                            policyVersion: "default",
                            // this is where user attributes can be passed
                            attributes: {},
                        },
                        resource: {
                            kind: resource,
                            policyVersion: "default",
                            id: params?.id + "" || "new",
                            attributes: params,
                        },
                        // the list of actions on the resource to check authorization for
                        actions: [action],
                    });
                    return Promise.resolve({
                        can: result.isAllowed(action) || false,
                    });
                },
            }}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
                {
                    name: "users",
                    list: UserList,
                    create: UserCreate,
                    edit: UserEdit,
                    show: UserShow,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    show: CategoryShow,
                },
            ]}
            Header={() => <Header role={role} />}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
