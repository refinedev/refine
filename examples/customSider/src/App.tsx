import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";
import "./index.css";

import { PostList } from "pages/posts";
import { CustomSider } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Sider={CustomSider}
            Title={({ collapsed }) => (
                <div className="title-container">
                    {collapsed && <img src="/short-refine.svg" alt="Refine" />}
                    {!collapsed && <img src="/refine.svg" alt="Refine" />}
                </div>
            )}
        >
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
