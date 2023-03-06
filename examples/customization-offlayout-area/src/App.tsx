import { Refine } from "@refinedev/core";
import { notificationProvider, ErrorComponent } from "@refinedev/antd";
import { BackTop, Layout as AntdLayout, Grid } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";

import "@refinedev/antd/dist/reset.css";

import { PostList } from "pages/posts";
import { FixedSider } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const breakpoint = Grid.useBreakpoint();
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            legacyRouterProvider={routerProvider}
            Layout={({ children, Header, Footer, OffLayoutArea }) => (
                <AntdLayout
                    style={{ minHeight: "100vh", flexDirection: "row" }}
                >
                    <FixedSider />
                    <AntdLayout style={{ marginLeft: 200 }}>
                        {Header && <Header />}
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
                        {Footer && <Footer />}
                    </AntdLayout>
                    {OffLayoutArea && <OffLayoutArea />}
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
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
