import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
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
