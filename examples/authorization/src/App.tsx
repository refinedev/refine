import { Admin, Resource, AuthProvider } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("username");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["admin"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
                avatar:
                    "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
