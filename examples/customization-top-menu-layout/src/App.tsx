import { GitHubBanner, Refine } from "@refinedev/core";
import { notificationProvider, ErrorComponent } from "@refinedev/antd";
import { Layout as AntdLayout } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import "@refinedev/antd/dist/reset.css";

import { PostList } from "pages/posts";
import { CustomSider } from "components";

const { Link } = routerProvider;

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider(API_URL)}
                legacyRouterProvider={routerProvider}
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
                            {Footer && <Footer />}
                        </AntdLayout.Content>
                        {OffLayoutArea && <OffLayoutArea />}
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
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                    },
                ]}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
            />
        </>
    );
};

export default App;
