import { Refine } from "@pankod/refine-core";
import {
    AntdLayout,
    notificationProvider,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList } from "pages/posts";
import { CustomSider } from "components";

const { Link } = routerProvider;

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
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
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
