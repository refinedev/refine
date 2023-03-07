import { Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import "@refinedev/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                /**
                 * By default refine uses the first route with `list` property as the initial route.
                 * If you want to change the initial route, you can bind the `initialRoute` property to the `RouterComponent` property.
                 *
                 * Example:
                 *
                 *  RouterComponent: routerProvider.RouterComponent.bind({
                 *     initialRoute: "/posts",
                 *  }),
                 */
            }}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "samples",
                    list: AntdInferencer,
                    edit: AntdInferencer,
                    show: AntdInferencer,
                    create: AntdInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: AntdInferencer,
                    edit: AntdInferencer,
                    show: AntdInferencer,
                    create: AntdInferencer,
                    canDelete: true,
                },
                {
                    name: "users",
                    list: AntdInferencer,
                    edit: AntdInferencer,
                    show: AntdInferencer,
                    create: AntdInferencer,
                    canDelete: true,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
