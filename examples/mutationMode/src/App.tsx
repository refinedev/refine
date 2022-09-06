import { Refine } from "@pankod/refine-core";
import {
    BackTop,
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import { DemoSidebar, useDemoSidebar } from "@pankod/refine-demo-sidebar";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [refineProps, demoSidebarProps] = useDemoSidebar();

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            OffLayoutArea={() => (
                <>
                    <BackTop />
                    <DemoSidebar {...demoSidebarProps} />
                </>
            )}
            {...refineProps}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
