import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { PostCreate } from "pages/posts";
import {
    AntdShowGuesser,
    AntdEditGuesser,
    AntdListGuesser,
} from "@pankod/refine-guesser/antd";

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
                    name: "posts",
                    list: AntdListGuesser,
                    edit: AntdEditGuesser,
                    show: AntdShowGuesser,
                    create: PostCreate,
                    canDelete: true,
                },
                {
                    name: "categories",
                },
                {
                    name: "users",
                },
                {
                    name: "tags",
                },
                {
                    name: "languages",
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
