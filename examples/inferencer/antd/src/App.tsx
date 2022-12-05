import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import {
    AntdShowInferencer,
    AntdEditInferencer,
    AntdListInferencer,
    AntdCreateInferencer,
} from "@pankod/refine-inferencer/antd";

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
                    list: AntdListInferencer,
                    edit: AntdEditInferencer,
                    show: AntdShowInferencer,
                    create: AntdCreateInferencer,
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: AntdListInferencer,
                    edit: AntdEditInferencer,
                    show: AntdShowInferencer,
                    create: AntdCreateInferencer,
                    canDelete: true,
                },
                {
                    name: "users",
                    list: AntdListInferencer,
                    edit: AntdEditInferencer,
                    show: AntdShowInferencer,
                    create: AntdCreateInferencer,
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
