import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import { newEnforcer } from "casbin.js";
import "@pankod/refine-antd/dist/styles.min.css";

import { model, adapter } from "accessControl";
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

const App: React.FC = () => {
    const role = localStorage.getItem("role") ?? "admin";

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
                can: async ({ action, params, resource }) => {
                    const enforcer = await newEnforcer(model, adapter);
                    if (
                        action === "delete" ||
                        action === "edit" ||
                        action === "show"
                    ) {
                        return Promise.resolve({
                            can: await enforcer.enforce(
                                role,
                                `${resource}/${params.id}`,
                                action,
                            ),
                        });
                    }
                    if (action === "field") {
                        return Promise.resolve({
                            can: await enforcer.enforce(
                                role,
                                `${resource}/${params.field}`,
                                action,
                            ),
                        });
                    }
                    return Promise.resolve({
                        can: await enforcer.enforce(role, resource, action),
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
        />
    );
};

export default App;
