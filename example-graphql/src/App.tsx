import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import {
    Admin,
    Resource,
    AuthProvider,
    JsonGraphqlServer,
    createClient,
    introspectionQuery,
} from "readmin";
import { PostList, PostCreate, PostEdit } from "./components/pages/post";

function App() {
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

    const client = createClient("http://localhost:3000");

    const [introspection, setIntrospection] = useState(null);

    useEffect(() => {
        introspectionQuery(client).then((response: any) =>
            setIntrospection(response),
        );
    }, []);

    if (!introspection) {
        return <span>loading...</span>;
    }

    return (
        <Admin
            authProvider={authProvider}
            dataProvider={JsonGraphqlServer(client, introspection)}
        >
            <Resource
                name="Posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                // show={PostShow}
                canDelete
                // options={{ label: "My Posts" }}
            />
        </Admin>
    );
}

export default App;
