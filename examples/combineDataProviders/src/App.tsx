import { Refine, DataProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import simpleRestDataProvider from "@pankod/refine-simple-rest";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/categories";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";
const NESTJSX_CRUD_API_URL = "https://api.nestjsx-crud.refine.dev";

const simpleRest = simpleRestDataProvider(SIMPLE_REST_API_URL);
const nestjsxCrud = nestjsxCrudDataProvider(NESTJSX_CRUD_API_URL);

const dataProvider = new Proxy(simpleRest, {
    get: (target, name) => {
        return (params: any) => {
            if (typeof name === "symbol" || name === "then") {
                return;
            }

            if (params.resource === "categories") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return nestjsxCrud[name](params);
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return simpleRest[name](params);
        };
    },
});

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
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
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
