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
    AntdShowGuesser,
    AntdEditGuesser,
    AntdListGuesser,
} from "@pankod/refine-guesser/antd";

const API_URL = "https://api.fake-rest.refine.dev";

// const PostList = () => <AntdListGuesser name="posts" />;
// const CategoryList = () => <AntdListGuesser name="categories" />;
// const UserList = () => <AntdListGuesser name="users" />;

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
                    canDelete: true,
                },
                {
                    name: "categories",
                    list: AntdListGuesser,
                    edit: AntdEditGuesser,
                    show: AntdShowGuesser,
                },
                {
                    name: "users",
                    list: AntdListGuesser,
                    edit: AntdEditGuesser,
                    show: AntdShowGuesser,
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
