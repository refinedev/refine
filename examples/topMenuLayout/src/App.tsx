import { Refine, Resource, AntdLayout, Link } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
import { CustomSider } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Layout={({ children, Footer, OffLayoutArea }) => (
                <AntdLayout>
                    <AntdLayout.Header>
                        <CustomSider />
                    </AntdLayout.Header>
                    <AntdLayout.Content>
                        <AntdLayout.Content>
                            <div style={{ padding: 24, minHeight: 360 }}>
                                {children}
                            </div>
                        </AntdLayout.Content>
                        <Footer />
                    </AntdLayout.Content>
                    <OffLayoutArea />
                </AntdLayout>
            )}
            Title={() => (
                <Link to="/" style={{ float: "left", marginRight: "10px" }}>
                    <img
                        src="/refine.svg"
                        alt="Refine"
                        style={{ width: "100px" }}
                    />
                </Link>
            )}
        >
            <Resource name="posts" list={PostList} />
        </Refine>
    );
};

export default App;
