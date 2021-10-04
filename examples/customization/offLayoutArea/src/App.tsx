import { Refine, BackTop, AntdLayout, Grid } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";

import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";
import { FixedSider } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const routeProvider = routerProvider();

const App: React.FC = () => {
    const breakpoint = Grid.useBreakpoint();
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routeProvider}
            Layout={({ children, Header, Footer, OffLayoutArea }) => (
                <AntdLayout
                    style={{ minHeight: "100vh", flexDirection: "row" }}
                >
                    <FixedSider />
                    <AntdLayout style={{ marginLeft: 200 }}>
                        <Header />
                        <AntdLayout.Content>
                            <div
                                style={{
                                    padding: breakpoint.sm ? 24 : 12,
                                    minHeight: 360,
                                }}
                            >
                                {children}
                            </div>
                        </AntdLayout.Content>
                        <Footer />
                    </AntdLayout>
                    <OffLayoutArea />
                </AntdLayout>
            )}
            OffLayoutArea={() => (
                <>
                    <BackTop />
                </>
            )}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

export default App;
