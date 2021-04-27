import { Admin, Resource } from "@pankod/refine";
import AuthProvider from "@pankod/refine-stripi-auth";
import DataProvider from "@pankod/refine-nestjsx-crud";

import { PostList } from "./components/pages/posts";

const App = () => {
    const apiUrl = "http://localhost:1337";
    const authProvider = AuthProvider(apiUrl);
    const dataProvider = DataProvider("https://refine-nestjs-crud.pankod.com");

    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="posts" list={PostList} />
        </Admin>
    );
};

export default App;
