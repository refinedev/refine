import { Refine, BackTop } from "@pankod/refine";
import { DemoSidebar, useDemoSidebar } from "@pankod/refine-demo-sidebar";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [refineProps, demoSidebarProps] = useDemoSidebar();

    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
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
        />
    );
};

export default App;
