import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { BackTop } from "antd";
import { DemoSidebar, useDemoSidebar } from "@refinedev/demo-sidebar";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [refineProps, demoSidebarProps] = useDemoSidebar();

    return (
        <>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_URL)}
                legacyRouterProvider={routerProvider}
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
        </>
    );
};

export default App;
