import { Admin, Resource, AntdLayout, Link } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
import { CustomMenu } from "./CustomMenu";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    return (
        <Admin
            dataProvider={dataProvider(API_URL)}
            Layout={({ children, Footer, OffLayoutArea }) => (
                <AntdLayout>
                    <AntdLayout.Header>
                        <CustomMenu />
                    </AntdLayout.Header>
                    <AntdLayout.Content className="site-layout">
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
                <Link to="/">
                    <a
                        href="/"
                        style={{
                            float: "left",
                            minWidth: "70px",
                            textAlign: "center",
                        }}
                    >
                        refine
                    </a>
                </Link>
            )}
        >
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};

export default App;
