import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Footer={() => (
                <div
                    style={{
                        backgroundColor: "white",
                        height: "64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Custom Footer Content
                </div>
            )}
        >
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
