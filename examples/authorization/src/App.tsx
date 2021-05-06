import { Admin, Resource, AuthProvider } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://refine-fake-rest.pankod.com";

const App = () => {
    const authProvider: AuthProvider = {
        login: (params: any) => {
            let auth: object;
            switch (params.username) {
                case "admin":
                    auth = {
                        username: params.username,
                        permissions: "admin",
                    };
                    localStorage.setItem("auth", JSON.stringify(auth));
                    return Promise.resolve();
                case "editor":
                    auth = {
                        username: params.username,
                        permissions: "editor",
                    };
                    localStorage.setItem("auth", JSON.stringify(auth));
                    return Promise.resolve();
                default:
                    Promise.reject();
            }
            return Promise.reject();
        },
        logout: () => {
            localStorage.removeItem("auth");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
        getPermissions: () => {
            const auth = localStorage.getItem("auth");
            if (auth) {
                const parseAuth = JSON.parse(auth);
                const role = parseAuth.permissions;
                return role ? Promise.resolve(role) : Promise.reject();
            }
            return Promise.reject();
        },
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
