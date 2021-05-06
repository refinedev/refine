import { Admin, Resource, AuthProvider } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://refine-fake-rest.pankod.com";

interface Auth {
    username: string;
    permission: string;
}

const App = () => {
    const authProvider: AuthProvider = {
        login: ({ username }) => {
            let auth: Auth;
            switch (username) {
                case "admin":
                    auth = {
                        username,
                        permission: "admin",
                    };
                    break;
                case "editor":
                    auth = {
                        username,
                        permission: "editor",
                    };
                    break;
                default:
                    return Promise.reject();
            }
            localStorage.setItem("auth", JSON.stringify(auth));
            return Promise.resolve();
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
                const parseAuth: Auth = JSON.parse(auth);
                const role = parseAuth.permission;
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
