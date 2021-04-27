import { Admin, Resource } from "@pankod/refine";
import AuthProvider from "@pankod/refine-strapi-auth";
import DataProvider from "@pankod/refine-strapi";

import { PostList } from "./components/pages/posts";

const App = () => {
    const apiUrl = "http://localhost:1337";
    const authProvider = AuthProvider(apiUrl);
    const dataProvider = DataProvider(apiUrl);

    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};

export default App;
